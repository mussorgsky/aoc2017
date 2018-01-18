const fs = require('fs');
const GIFEncoder = require('gifencoder');
const Canvas = require('canvas');

let path = '';
let giffing = false;

if(process.argv[2] == 'test') {
	// testiq([7], (x=>x>2), true);
	path = __dirname + '/' + 'data-test.txt';
} else {
	path = __dirname + '/' + 'data.txt';

}

if(process.argv.includes('gif')) {
	giffing = true;
}

const data = fs.readFileSync(path).toString().trim();

const knotHash = (input) => {
	const theList = [];

	for(let i = 0; i < 256; i++) {
		theList[i] = i;
	}

	let data = input.toString().trim().split('').map(x=>x.charCodeAt(0)).concat([17, 31, 73, 47, 23]);

	let currPos = 0, skipSize = 0;

	for(let eh = 0; eh < 64; eh++) {
		for(let length of data) {
			let reversable = [];
			for(let i = 0; i < length; i++) {
				reversable.push(theList[(currPos + i) % theList.length])
			}
			reversable.reverse();
			for(let i = 0; i < length; i++) {
				theList[(currPos + i) % theList.length] = reversable[i];
			}

			currPos += length + skipSize;
			skipSize += 1;
		}
	}

	const dense = [];

	for(let i = 0; i < 16; i++) {
		let thing = theList[i * 16];
		for(let k = 1; k < 16; k++) {
			thing = thing ^ theList[i * 16 + k];
		}
		dense.push(thing);
	}

	return dense.map(x=>x.toString(16).padStart(2, '0')).join('');
};

const findNotZero = (arr2d) => {
	for(let [y, row] of arr2d.entries()) {
		for(let [x, value] of row.entries()) {
			if(value == 1) {
				return({y, x});
			}
		}
	}

	return false;
};

const clearNeighbours = (p, arr2d) => {
	arr2d[p.y][p.x] = 0;
	const neighbours = [[p.y - 1, p.x], [p.y + 1, p.x], [p.y, p.x - 1], [p.y, p.x + 1]];
	for(n of neighbours) {
		if(n[0] >= 0 && n[1] >= 0 && n[0] < arr2d.length && n[1] < arr2d[n[0]].length) {
			if(arr2d[n[0]][n[1]] == 1) {
				arr2d[n[0]][n[1]] = 0;
				clearNeighbours({ y: n[0], x: n[1] }, arr2d);
			}
		}
	}
};

const disc = [];
let used = 0;
let regionCount = 0;

for(let i = 0; i < 128; i++) {
	disc[i] = knotHash(data + '-' + i.toString(10)).split('').map(x=>parseInt(x, 16).toString(2).padStart(4, '0')).join('').split('').map(Number);
	used += disc[i].reduce((acc, val) => acc + val, 0);
}

const frames = [];

let pos;
while(pos = findNotZero(disc)) {
	regionCount += 1;
	clearNeighbours(pos, disc);
	if(giffing) {
		frames.push(JSON.parse(JSON.stringify(disc)));
	}
}

console.log(used, regionCount);

if(giffing) {
	console.log(frames.length);

	var encoder = new GIFEncoder(128, 128);
	encoder.createReadStream().pipe(fs.createWriteStream('myanimated.gif'));

	encoder.start();
	encoder.setRepeat(0);   // 0 for repeat, -1 for no-repeat 
	encoder.setDelay(1000 / 60);  // frame delay in ms 
	encoder.setQuality(10);

	var canvas = new Canvas(128, 128);
	var ctx = canvas.getContext('2d');

	for(let frame of frames) {
		ctx.fillRect(0, 0, 128, 128);
		for(let [y, row] of frame.entries()) {
			for(let [x, value] of row.entries()) {
			    ctx.fillStyle = value ? 'black' : 'white';
				ctx.fillRect(x, y, 1, 1);
			}
		}
		encoder.addFrame(ctx);
	}

	encoder.finish();
}
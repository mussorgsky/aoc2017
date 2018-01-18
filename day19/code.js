const fs = require('fs');

const Directions = {
	up: {
		x: 0,
		y: -1
	},
	down: {
		x: 0,
		y: 1
	},
	left: {
		x: -1,
		y: 0
	},
	right: {
		x: 1,
		y: 0
	},
}

const move = (map, p) => {
	const currentTile = map[p.y][p.x];
	// console.log(currentTile);
	if (!'|-+'.includes(currentTile)) {
		console.log('Found letter ' + currentTile + '!' + steps);
		letters.push(currentTile);
	}
	let nextDir = p.dir;
	if (currentTile == '+') {
		// console.log('Junction hit at (' + p.x + ', ' + p.y + ')');
		// console.log('\tCurrent movement direction: ' + p.dir.toUpperCase());
		if (p.dir == 'down' || p.dir == 'up') {
			// console.log('\tPossible new directions: LEFT or RIGHT');
			const toLeft = map[p.y][p.x - 1];
			const toRight = map[p.y][p.x + 1];
			// console.log('\t\tTo the left is: "' + toLeft + '"');
			// console.log('\t\tTo the right is: "' + toRight + '"');
			nextDir = (toLeft == ' ') ? 'right' : 'left';
		} else if (p.dir == 'left' || p.dir == 'right') {
			// console.log('\tPossible new directions: UP or DOWN');
			const toUp = map[p.y - 1][p.x];
			const toDown = map[p.y + 1][p.x];
			// console.log('\t\tTo the up is: "' + toUp + '"');
			// console.log('\t\tTo the down is: "' + toDown + '"');
			nextDir = (toUp == ' ') ? 'down' : 'up';
		}
	}
	p.dir = nextDir;
	// console.log(currentTile);
	p.x += Directions[p.dir].x;
	p.y += Directions[p.dir].y;
	steps += 1;
	return p;
};

let path = __dirname + '/' + ((process.argv[2] == 'test') ? 'data-test.txt' : 'data.txt');

const data = fs.readFileSync(path).toString().split('\n').map(x => x.split(''));
const w = data[0].length;
const h = data.length;

const letters = [];
let steps = 0;

let pos = {
	x: data[0].indexOf('|'),
	y: 0,
	dir: 'down',
};

while (pos.x >= 0 && pos.x < w && pos.y >= 0 && pos.y < h) {
	pos = move(data, pos);
}

console.log(letters.join(''));
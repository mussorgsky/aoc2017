const fs = require('fs');
let timer = process.hrtime();

let path = __dirname + '/' + ((process.argv[2] == 'test') ? 'data-test.txt' : 'data.txt');

const parts = fs.readFileSync(path).toString().trim().split('\n').map(x => x.split('/').map(Number));

for (let p of parts) {
	p.sort((a, b) => a - b);
}

const hasPort = (part, port) => {
	return part.indexOf(port) != -1;
}

const otherPort = (part, port) => {
	return part[(part.indexOf(port) + 1) % 2];
}

const copySansPart = (arr, part) => {
	const result = [];
	for (const a of arr) {
		if (!(a[0] == part[0] && a[1] == part[1])) {
			result.push([a[0], a[1]]);
		}
	}
	return result;
}

const findGoodPieces = (pieces, port) => {
	const result = [];
	for (const p of pieces) {
		if (hasPort(p, port)) {
			result.push([p[0], p[1]]);
		}
	}
	return result;
}

const bridges = [];
let maxStrength = 0;
let maxLength = [0, 0];

// console.log(findGoodPieces(parts, 0));

const generateBridges = (accum, pieces, bridge, start) => {
	goodOnes = findGoodPieces(pieces, start);
	if (goodOnes.length == 0) {
		accum.push(bridge);
		// console.log(bridge);
	} else {
		for (const good of goodOnes) {
			const other = otherPort(good, start);
			generateBridges(accum, copySansPart(pieces, good), bridge.concat([good]), other);
		}
	}
}

generateBridges(bridges, parts, [], 0);
// console.log(bridges);
for (let b of bridges) {
	let strength = b.map(x => x.reduce((p, c) => p + c, 0)).reduce((p, c) => p + c, 0)
	let length = b.length;
	if (strength > maxStrength) {
		maxStrength = strength;
	}
	if (length >= maxLength[0]) {
		if (length > maxLength[0] || (strength > maxLength[1])) {
			// console.log(length, strength);
			maxLength = [length, strength];
		}
	}
}
timer = process.hrtime(timer);
console.log('Elapsed time: ' + (timer[0] + ',' + (timer[1] / 1e9).toFixed(3).split('.')[1]) + ' seconds\nTotal of ' + bridges.length + ' bridges generated\nStrenght of strongest: ' + maxStrength + '\nStrength of longest: ' + maxLength[1]);
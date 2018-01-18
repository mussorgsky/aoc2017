const fs = require('fs');

const testiq = (data, func, expected) => {
	const funcResult = func(...data);
	const result = areEqual(funcResult, expected);
	console.log((result) ? 'PASSED' : 'FAILED');
	if(!result) {
		console.log(data);
		console.log(funcResult + ' should be ' + expected);
	}
}

const areEqual = (arr1, arr2) => {
	if(!(arr1 instanceof Array) || !(arr2 instanceof Array)) {
		return arr1 === arr2;
	}
	if(arr1.length != arr2.length) {
		return false;
	}
	for(let i = 0; i < arr1.length; i++) {
		if(arr1[i] != arr2[i]) { return false; }
	}
	return true;
};

let path = '';

if(process.argv[2] == 'test') {
	// testiq([7], (x=>x>2), true);
	path = __dirname + '/' + 'data-test.txt';
} else {
	path = __dirname + '/' + 'data.txt';

}

// let data = fs.readFileSync(path).toString().trim().split(',').map(Number);
const data = fs.readFileSync(path).toString().trim().split(',');
// console.log(data);

let dist = (v1, v2) => {
	const v = { x: v1.x - v2.x, y: v1.y - v2.y };
	return Math.sqrt(v.x * v.x + v.y * v.y);
}

const calcSteps = (start, end) => {
	let steps = [];
	// let steps = 0;
	const moves = [[0, 1], [0, -1], [1, 0.5], [-1, -0.5], [-1, 0.5], [1, -0.5]];
	const names = ['n', 's', 'ne', 'sw', 'nw', 'se'];

	while(dist(start, end) > 0) {
		// console.log(start, end, dist(start, end));
		let bestMove = { name: '', d: 1000000, i: null };
		for(let i = 0; i < 6; i++) {
			let newstart = { x: start.x + moves[i][0], y: start.y + moves[i][1] };
			let d = dist(newstart, end);
			if(d < bestMove.d) {
				bestMove = { name: names[i], d: d, i: i };
			}
		}
		start = { x: start.x + moves[bestMove.i][0], y: start.y + moves[bestMove.i][1] };
		steps.push(bestMove);
		// steps += 1;
	}
	return steps;
};

let largestDist = 0;

let pos = { x: 0, y: 0};
let target = { x: 0, y: 0};

for(let dir of data) {
	switch(dir) {
		case 'n': {
			target.y += 1;
			break;
		}
		case 's': {
			target.y -= 1;
			break;
		}
		case 'ne': {
			target.x += 1;
			target.y += 0.5;
			break;
		}
		case 'sw': {
			target.x -= 1;
			target.y -= 0.5;
			break;
		}
		case 'nw': {
			target.x -= 1;
			target.y += 0.5;
			break;
		}
		case 'se': {
			target.x += 1;
			target.y -= 0.5;
			break;
		}
	}
	let d = calcSteps(pos, target).length;
	// let d = calcSteps(pos, target);
	if(d > largestDist) { largestDist = d; };
}

let steps = calcSteps(pos, target);
console.log(steps, steps.length, largestDist);

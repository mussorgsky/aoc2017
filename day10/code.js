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
let theList = [];

if(process.argv[2] == 'test') {
	// testiq([7], (x=>x>2), true);
	path = __dirname + '/' + 'data-test.txt';
	for(let i = 0; i < 256; i++) {
		theList[i] = i;
	}
} else {
	path = __dirname + '/' + 'data.txt';
	for(let i = 0; i < 256; i++) {
		theList[i] = i;
	}
}

// let data = fs.readFileSync(path).toString().trim().split(',').map(Number);
let data = fs.readFileSync(path).toString().trim().split('').map(x=>x.charCodeAt(0)).concat([17, 31, 73, 47, 23]);
console.log(data);

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
		// console.log(theList);

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

console.log(dense);
console.log(dense.map(x=>x.toString(16).padStart(2, '0')).join(''));
// console.log(theList[0] * theList[1]);

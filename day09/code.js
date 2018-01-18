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

const data = fs.readFileSync(path).toString().trim().replace(/(\!.)/g, '');

// console.log(data);

let score = 0;

let groupDepth = 0;
let inGarbage = false;

for(char of data) {
	switch(char) {
		case '{': {
			if(!inGarbage) {
				groupDepth += 1;
			}
			break;	
		}
		case '}': {
			if(!inGarbage) {
				score += groupDepth;
				groupDepth -= 1;
			}
			break;	
		}
		case '<': {
			if(!inGarbage) {
				inGarbage = true;
			}
			break;
		}
		case '>': {
			inGarbage = false;
			break;
		}
	}
}

console.log(score);

let nonRemoved = 0;
inGarbage = false;
for(char of data) {
	switch(char) {
		case '{': {
			if(inGarbage) {
				nonRemoved += 1;
			}
			break;	
		}
		case '}': {
			if(inGarbage) {
				nonRemoved += 1;
			}
			break;	
		}
		case '<': {
			if(!inGarbage) {
				inGarbage = true;
			} else {
				nonRemoved += 1;
			}
			break;
		}
		case '>': {
			if(inGarbage) {
				inGarbage = false;
			}
			break;
		}
		default: {
			if(inGarbage) {
				nonRemoved += 1;
			}
			break;
		}
	}
}

console.log(nonRemoved);

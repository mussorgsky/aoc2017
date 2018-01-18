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

const doesContain = (big, small) => {
	for(thing of big) {
		if(areEqual(thing, small)) { return true; }
	}
	return false;
};

const findMaxIdx = (arr) => {
	let idx = 0;

	for(let i = 0; i < arr.length; i++) {
		if(arr[i] > arr[idx]) { idx = i;}
	}

	return idx;
};

const redistribute = (arr, start) => {
	arr = Array.from(arr);
	//start is the one BEFORE the one you want to put things in first
	let num = arr[start];
	arr[start] = 0;
	let idx = (start + 1) % arr.length;
	while(num > 0) {
		arr[idx] += 1;
		num -= 1;
		idx = (idx + 1) % arr.length;
	}
	return arr;
}

const countCycle = (startState) => {
	let pastStates = [];
	let when = [];
	let cycles = 0;

	let state = startState;
	while(!doesContain(pastStates, state)) {
		pastStates.push(state);
		when[state.toString()] = cycles;

		let maxIdx = findMaxIdx(state);
		state = redistribute(state, maxIdx);

		cycles += 1;
	}
	return [cycles, cycles - when[state.toString()]];
}

if(process.argv[2] == 'test') {
	testiq([[0, 1, 2, 3], [3, 0, 2, 1]], areEqual, false);
	testiq([[0, 1, 2, 3], [0, 1, 2, 3]], areEqual, true);
	testiq([[[1, 2], [3, 4], [2, 1]], [1, 2]], doesContain, true);
	testiq([[[1, 2], [3, 4], [2, 1]], [4, 3]], doesContain, false);
	testiq([[0, 1, 2, 3]], findMaxIdx, 3);
	testiq([[0, 2, 7, 0], 2], redistribute, [2, 4, 1, 2])
	testiq([[0, 2, 7, 0]], countCycle, [5, 4]);
} else {
	const path = __dirname + '/' + 'data.txt';
	const data = fs.readFileSync(path).toString().trim().split('\t').map(Number);

	console.log(countCycle(data));
}

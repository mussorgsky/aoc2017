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

if(process.argv[2] == 'test') {
	testiq([7], (x=>x>2), true);
} else {
	// const path = __dirname + '/' + 'data-test.txt';
	const path = __dirname + '/' + 'data.txt';
	const data = fs.readFileSync(path).toString().trim().split('\n').map(x=>x.split(' '));

	const instructions = data.map(x=>{return {reg: x[0], inst: x[1], num: Number(x[2]), cond: {reg: x[4], test: x[5], num: Number(x[6])}}});

	// console.log(instructions);

	let registers = [];
	for(inst of instructions) {
		registers[inst.reg] = 0;
	}

	let maxEver = 0;

	for(inst of instructions) {
		let condGood = false;
		// console.log(inst);
		switch(inst.cond.test) {
			case '<': {
				condGood = registers[inst.cond.reg] < inst.cond.num;
				break;
			}
			case '>': {
				condGood = registers[inst.cond.reg] > inst.cond.num;
				break;
			}
			case '>=': {
				condGood = registers[inst.cond.reg] >= inst.cond.num;
				break;
			}
			case '<=': {
				condGood = registers[inst.cond.reg] <= inst.cond.num;
				break;
			}
			case '==': {
				condGood = registers[inst.cond.reg] == inst.cond.num;
				break;
			}
			case '!=': {
				condGood = registers[inst.cond.reg] != inst.cond.num;
				break;
			}
		}
		// console.log(condGood);
		if(condGood) {
			if(inst.inst == 'inc') { registers[inst.reg] += inst.num; }
			if(inst.inst == 'dec') { registers[inst.reg] -= inst.num; }
		}
		if(registers[inst.reg] > maxEver) { maxEver = registers[inst.reg]; }
	}

	let max = 0;
	for(reg in registers) {
		// console.log(registers[reg]);
		if(registers[reg] > max) { max = registers[reg]; }
	}
	console.log(max, maxEver);
}

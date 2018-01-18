const fs = require('fs');

let path = __dirname + '/' + ((process.argv[2] == 'test') ? 'data-test.txt' : 'data.txt');

const data = fs.readFileSync(path).toString().trim().split('\n').map(x => x.split(' '));
const registers = {
	a: 0,
	b: 0,
	c: 0,
	d: 0,
	e: 0,
	f: 0,
	g: 0,
	h: 0
}
let pos = 0;
let mulTimes = 0;

const handleIt = (inst, memory, ptr, wait) => {
	switch (inst[0]) {
		case 'set':
			{
				const bIsReg = Number.isNaN(parseInt(inst[2], 10));
				if (bIsReg) {
					memory[inst[1]] = +memory[inst[2]];
				} else {
					memory[inst[1]] = +inst[2];
				}
				return ptr + 1;
			}
		case 'sub':
			{
				const bIsReg = Number.isNaN(parseInt(inst[2], 10));
				if (bIsReg) {
					memory[inst[1]] -= +memory[inst[2]];
				} else {
					memory[inst[1]] -= +inst[2];
				}
				return ptr + 1;
			}
		case 'mul':
			{
				mulTimes += 1;
				const bIsReg = Number.isNaN(parseInt(inst[2], 10));
				if (bIsReg) {
					memory[inst[1]] *= +memory[inst[2]];
				} else {
					memory[inst[1]] *= +inst[2];
				}
				return ptr + 1;
			}
		case 'jnz':
			{
				const aIsReg = Number.isNaN(parseInt(inst[1], 10));
				const bIsReg = Number.isNaN(parseInt(inst[2], 10));

				const a = aIsReg ? +memory[inst[1]] : +inst[1];
				const b = bIsReg ? +memory[inst[2]] : +inst[2];
				if (a != 0) {
					return ptr + b;
				}
				return ptr + 1;
			}
		default:
			{
				console.error('Unknown instruction');
				return ptr + 1;
			}
	}
}

while (pos >= 0 && pos < data.length) {
	pos = handleIt(data[pos], registers, pos);
}

// console.log(registers['h']);
const fs = require('fs');

let path = __dirname + '/' + ((process.argv[2] == 'test') ? 'data-test.txt' : 'data.txt');

const data = fs.readFileSync(path).toString().trim().split('\n').map(x => x.split(' '));
const registers = [
	[],
	[]
];
const pos = [0, 0];
const messages = [
	[],
	[]
];
const waiting = [false, false];
const timesSent = [0, 0];

const handleIt = (inst, memory, ptr, outMsg, inMsg, wait, times, idx) => {
	switch (inst[0]) {
		case 'snd':
			{
				const aIsReg = Number.isNaN(parseInt(inst[1], 10));
				if (aIsReg) {
					outMsg.push(+memory[inst[1]]);
				} else {
					outMsg.push(+inst[1]);
				}
				times[idx] += 1;
				return ptr + 1;
			}
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
		case 'add':
			{
				const bIsReg = Number.isNaN(parseInt(inst[2], 10));
				if (bIsReg) {
					memory[inst[1]] += +memory[inst[2]];
				} else {
					memory[inst[1]] += +inst[2];
				}
				return ptr + 1;
			}
		case 'mul':
			{
				const bIsReg = Number.isNaN(parseInt(inst[2], 10));
				if (bIsReg) {
					memory[inst[1]] *= +memory[inst[2]];
				} else {
					memory[inst[1]] *= +inst[2];
				}
				return ptr + 1;
			}
		case 'mod':
			{
				const bIsReg = Number.isNaN(parseInt(inst[2], 10));
				if (bIsReg) {
					memory[inst[1]] %= +memory[inst[2]];
				} else {
					memory[inst[1]] %= +inst[2];
				}
				return ptr + 1;
			}
		case 'rcv':
			{
				if (inMsg.length < 1) {
					wait[idx] = true;
					return ptr;
				}
				wait[idx] = false;
				memory[inst[1]] = inMsg.shift();
				return ptr + 1;
			}
		case 'jgz':
			{
				const aIsReg = Number.isNaN(parseInt(inst[1], 10));
				const bIsReg = Number.isNaN(parseInt(inst[2], 10));

				const a = aIsReg ? +memory[inst[1]] : +inst[1];
				const b = bIsReg ? +memory[inst[2]] : +inst[2];
				if (a > 0) {
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

for (let i = 0; i < 2; i++) {
	registers[i]['p'] = i;
}

while (!(waiting[0] && waiting[1])) {
	// console.log(messages, waiting);
	for (let i = 0; i < 2; i++) {
		pos[i] = handleIt(data[pos[i]], registers[i], pos[i], messages[(i + 1) % 2], messages[i], waiting, timesSent, i);
	}
}

console.log(timesSent);
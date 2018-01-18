const fs = require('fs');

// const path = __dirname + '/' + 'data-test.txt';
const path = __dirname + '/' + 'data.txt';
const data = fs.readFileSync(path).toString().split('\n').map(Number);

const day5 = (jumps, isPartTwo) => {
	let count = -1;
	let ptr = 0;

	while(ptr >= 0 || ptr < jumps.length) {
		if(isPartTwo && jumps[ptr] > 2) {
			ptr += jumps[ptr]--;
		} else {
			ptr += jumps[ptr]++;
		}
		count++;
	}
	return count;
}

let startTime = process.hrtime();
console.log('First part: ', day5(Array.from(data), false));
const firstDone = process.hrtime(startTime);
startTime = process.hrtime();
console.log('Second part: ', day5(Array.from(data), true));
const secondDone = process.hrtime(startTime);

const niceTime = (time) => {
	return (time[0] * 1e9 + time[1]) / 1e6 + 'ms';
};

console.log(niceTime(firstDone), niceTime(secondDone));

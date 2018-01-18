const fs = require('fs');

let path = '';

if(process.argv[2] == 'test') {
	// testiq([7], (x=>x>2), true);
	path = __dirname + '/' + 'data-test.txt';
} else {
	path = __dirname + '/' + 'data.txt';

}

const step = Number(fs.readFileSync(path).toString().trim());
const iters = 5e7;

//const buffer = [0];
let length = 1;
let pos = 0;
let last;

for(let i = 0; i < iters; i++) {
	/*
	pos = (pos + step) % buffer.length;
	buffer.splice(pos + 1, 0, i + 1);
	pos = (pos + 1) % buffer.length;
	*/
	pos = (pos + step) % length;
	if(pos == 0) {
		last = i + 1;
	}
	length += 1;
	pos = (pos + 1) % length;

}

console.log(last);



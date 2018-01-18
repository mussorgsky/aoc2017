const fs = require('fs');

let path = '';

if(process.argv[2] == 'test') {
	// testiq([7], (x=>x>2), true);
	path = __dirname + '/' + 'data-test.txt';
} else {
	path = __dirname + '/' + 'data.txt';

}

const data = fs.readFileSync(path).toString().trim().split('\n').map(x=>x.split(': ').map(Number));

const getScannerPos = (time, depth) => {
	if(depth == 0) { return 0; } 
	return Math.abs((time + depth - 1) % ((depth - 1) * 2) - (depth - 1)) + 1;
};

const caught = (time, depth, delay) => {
	return getScannerPos(time + delay, depth) == 1;
}

const checkCaught = (delay) => {
	for(let guard of data) {
		if(caught(...guard, delay)) {
			return true;
		}
	}
	return false;
}

const checkSeverity = (delay) => {
	let severity = 0;
	for(let guard of data) {
		if(caught(...guard, delay)) {
			// console.log('Caught at ' + guard[0]);
			severity += guard[0] * guard[1];
		}
	}
	return severity;
}

let d = 0;
while(checkCaught(++d)) {
	if(d % 1000000 == 0) { console.log(d); }
}

console.log(checkSeverity(0), d);
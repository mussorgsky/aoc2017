const fs = require('fs');

let path = '';

if(process.argv[2] == 'test') {
	// testiq([7], (x=>x>2), true);
	path = __dirname + '/' + 'data-test.txt';
} else {
	path = __dirname + '/' + 'data.txt';

}

const data = fs.readFileSync(path).toString().trim().split(' ').map(Number);
const factors = [16807, 48271];
const p2divs = [4, 8];
const dividerant = 2147483647;

const generate = (prev, factor) => (prev * factor) % dividerant;

const partOne = () => {
	let nice = 0;

	for(let i = 0; i < 5e7; i++) {
		for(let g = 0; g < 2; g++) {
			data[g] = generate(data[g], factors[g]);
		}
		const a16 = data[0].toString(2).padStart(32, '0').substring(16);
		const b16 = data[1].toString(2).padStart(32, '0').substring(16);
		if(a16 == b16) {
			nice += 1;
			console.log(i + ' (' + (i / 4e5).toFixed(2) + '%)' + ', ' + nice + '\n' + a16 + '\n' + b16);
		}
	}

	return nice;
}

const partTwo = () => {
	let nice = 0;

	for(let i = 0; i < 5e6; i++) {
		for(let g = 0; g < 2; g++) {
			while((data[g] = generate(data[g], factors[g])) % p2divs[g] != 0 );
		}
		const a16 = data[0].toString(2).padStart(32, '0').substring(16);
		const b16 = data[1].toString(2).padStart(32, '0').substring(16);
		if(a16 == b16) {
			nice += 1;
			console.log(i + ' (' + (i / 5e4).toFixed(2) + '%)' + ', ' + nice + '\n' + a16 + '\n' + b16);
		}
	}

	return nice;
}

// console.log(partOne());
console.log(partTwo());

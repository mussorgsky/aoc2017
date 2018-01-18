const fs = require('fs');

// const path = 'data-test.txt';
const path = 'data.txt';
const rawData = fs.readFileSync(path).toString().split('\n').map(x => x.split(' '));

const firstPart = (data) => {
	let validOnes = []

	for(row of data) {
		let things = [];
		let good = true;
		for(key of row) {
			if(!things.includes(key)) {
				things.push(key);
			} else {
				good = false;
			}
		}
		if(good) validOnes.push(row);
	}

	return validOnes;
}

const secondPart = (data) => {
	let validOnes = []

	for(row of data) {
		let things = [];
		let good = true;
		for(key of row) {
			key = key.split('').sort().join('');
			if(!things.includes(key)) {
				things.push(key);
			} else {
				good = false;
			}
		}
		if(good) validOnes.push(row);
	}

	return validOnes;
}

console.log('First part\nValid ones: ', firstPart(rawData).length);
console.log('Second part\nValid ones: ', secondPart(rawData).length);
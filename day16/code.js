const fs = require('fs');

let path = '';
let dancerinos;

if(process.argv[2] == 'test') {
	// testiq([7], (x=>x>2), true);
	path = __dirname + '/' + 'data-test.txt';
	dancerinos = 'abcde'.split('');
} else {
	path = __dirname + '/' + 'data.txt';
	dancerinos = 'abcdefghijklmnop'.split('');
}

let data = fs.readFileSync(path).toString().trim().split(',');

const swap = (arr, a, b) => {
	const h = arr[a];
	arr[a] = arr[b]
	arr[b] = h;

	return arr;
}

const spin = (dancers, move) => {
	const end = [];
	for(let i = 0; i < move.substring(1); i++) {
		end.push(dancers.pop())
	}
	dancers.unshift(...end.reverse());

	return dancers;
}

const exchange = (dancers, move) => {
	return swap(dancers, ...move.substring(1).split('/').map(Number));
}

const partner = (dancers, move) => {
	const idx = move.substring(1).split('/');
	return swap(dancers, dancers.indexOf(idx[0]), dancers.indexOf(idx[1]));
}

console.log(data.length);

//data = ['pa/n', 'pa/b', 'pc/m', 'pg/e', 'pf/k', 'pe/b', 'pj/f', 'pj/p', 'pl/c', 'pe/l'];

let states = [];

let loope = 1e9;

for(let i = 0; i < loope; i++) {
	if(i == 0) {
		console.log(dancerinos.join(''));
	}
	states.push(dancerinos.join(''));
	for(let move of data) {
		switch(move[0]) {
			case 's': {
				dancerinos = spin(dancerinos, move);
				break;
			}
			case 'x': {
				dancerinos = exchange(dancerinos, move);
				break;
			}
			case 'p': {
				dancerinos = partner(dancerinos, move);
				break;
			}
		}
	}
	if(states.includes(dancerinos.join(''))) {
		console.log(i, states.indexOf(dancerinos.join('')));
		loope %= i + 1;
		console.log('resulte: ' + states[loope]);
	}
}

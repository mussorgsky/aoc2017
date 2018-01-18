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

let path = '';

if(process.argv[2] == 'test') {
	// testiq([7], (x=>x>2), true);
	path = __dirname + '/' + 'data-test.txt';
} else {
	path = __dirname + '/' + 'data.txt';

}

const data = fs.readFileSync(path).toString().trim().split('\n').map(x=>x.split(' <-> ')).map(x=>[Number(x[0]), x[1].split(', ').map(Number)]);
// console.log(data);

let nodes = [];

for(let prog of data) {
	nodes[prog[0]] = prog[1];
}

const getTree = (branch, visited) => {
	for(let node of nodes[branch]) {
		// console.log('Checking ' + node);
		if(visited.includes(node)) {
			// console.log('\t ' + node + ' already visited');
		} else {
			// console.log('\t ' + node + ' added');
			visited.push(node);
			getTree(node, visited);
		}
	}
	return visited;
}


/*console.log(nodes);
let tree = getTree(nodes[0][0], []);
console.log(tree, tree.length);
*/

let trees = [];

for(let n = 0; n < nodes.length; n++) {
	// console.log(n, nodes[n]);
	trees[n] = getTree(n, []).sort().join();
}

trees = trees.filter((v, i ,s) => s.indexOf(v) == i);

console.log(trees.length);
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
	const path = __dirname + '/' + 'data.txt';
	const data = fs.readFileSync(path).toString().trim().split('\n').map(x=>x.split(' -> ')).map(x=>[x[0].split(' (').map(x=>x.replace(/\)/, '')), x[1]? x[1].split(', ') : null]);

	// console.log(data);

	let theNodes = [];
	for(node of data) {
		theNodes[node[0][0]] = { weight: Number(node[0][1]), aboves: node[1], belows: [] }
	}
	
	// console.log(theNodes);

	for(node in theNodes) {
		if(theNodes[node].aboves !== null) {
			for(above of theNodes[node].aboves) {
				theNodes[above].belows.push(above);
			}
		}
	}

	let root = null;

	for(node in theNodes) {
		if(theNodes[node].belows.length == 0) {
			console.log('root: ', node);
			root = theNodes[node];
		}
	}

	const calcWeight = (node) => {
		if(node.aboves === null) {
			return node.weight;
		} else {
			let sum = node.weight;
			for(above of node.aboves) {
				sum += calcWeight(theNodes[above])
			}
			return sum;
		}
	}

	const searched = 'vmttcwe';
	console.log('searched', searched);
	for(above of theNodes[searched].aboves) {
		console.log(theNodes[searched].weight, above, calcWeight(theNodes[above]) + theNodes[searched].weight);
	}
	//console.log('total: ', calcWeight(root));

	console.log(theNodes['vmttcwe'].weight - 8)
}

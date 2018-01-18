/*
edges start on the vertex of the 'bend'
	5←4←3 12
	↓   ↑ ↑
	6 1→2 11
	↓     ↑
	7→8→9→10
edges are 1, 2, 3, 5, 7, 10, 13, 17, 21...
*/

const findCorner = (edge) => {
	return Math.floor((edge + 1)/2) * Math.ceil((edge + 1)/2) + 1;
}

const findEdgeContaining = (number) => {
	let a = 0;
	while(findCorner(a + 1) <= number) {
		a += 1;
	}
	return a;
};

const getNthEdge = (n) => {
	const start = findCorner(n);
	const end = findCorner(n + 1);

	const result = [];

	for(let i = start; i < end; i++) {
		result.push(i);
	}

	return result;
};

const getNthEdgeLength = (n) => {
	const start = findCorner(n);
	const end = findCorner(n + 1);

	return end - start;
};

const puzzleInput = 312051;
const input = process.argv[2] || puzzleInput;

const edgeIndex = findEdgeContaining(input);
const edge = getNthEdge(edgeIndex);
const middle = (edge.length % 2 == 0)
	? edge[Math.ceil(edge.length / 2)]
	: edge[Math.ceil(edge.length / 2) - 1]
const halfDist = Math.abs(middle - input);

console.log(input, edgeIndex, edge, middle);

console.log(`abs(${middle} - ${input}) = ${halfDist}`);

console.log('Result of the first part:');
console.log(halfDist + Math.ceil(edgeIndex/ 4));

//PART TWO BEGINS HERE
const sSize = { x: 777, y: 777 };
let aim = { x: Math.floor(sSize.x / 2), y: Math.floor(sSize.y / 2) };
const dirs = [[1, 0], [0, -1], [-1, 0], [0, 1]];
let currentDir = 0;

const nextDir = () => (currentDir + 1) % dirs.length;
const moveAim = (dir) => { return { x: aim.x + dir[0], y: aim.y + dir[1] }}; 

let sSpace = [];
for(let y = 0; y < sSize.y; y++) {
	sSpace[y] = [];
	for(let x = 0; x < sSize.x; x++) {
		sSpace[y][x] = 0;
	}
}
sSpace[aim.y][aim.x] = 1;
aim = moveAim(dirs[currentDir]);

const sumOfNeighbors = (pos) => {
	let sum = 0;
	sum += sSpace[pos.y - 1][pos.x - 1] || 0;
	sum += sSpace[pos.y - 1][pos.x - 0] || 0;
	sum += sSpace[pos.y - 1][pos.x + 1] || 0;
	sum += sSpace[pos.y - 0][pos.x - 1] || 0;
	//sum += sSpace[pos.y - 0][pos.x - 0] || 0;
	sum += sSpace[pos.y - 0][pos.x + 1] || 0;
	sum += sSpace[pos.y + 1][pos.x - 1] || 0;
	sum += sSpace[pos.y + 1][pos.x - 0] || 0;
	sum += sSpace[pos.y + 1][pos.x + 1] || 0;
	return sum;
};

while(aim.x < sSize.x && aim.y < sSize.y) {
	sSpace[aim.y][aim.x] = sumOfNeighbors(aim);
	if(sSpace[aim.y][aim.x] > input) {
		console.log('Result of the second part: ' + sSpace[aim.y][aim.x]);
		break;
	}
	if(sSpace[moveAim(dirs[nextDir()]).y][moveAim(dirs[nextDir()]).x] == 0) {
		currentDir = nextDir();	
	}
	aim = moveAim(dirs[currentDir]);
	//console.log(sSpace);
}

//console.log(sSpace);

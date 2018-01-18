const fs = require('fs');

let path = __dirname + '/' + ((process.argv[2] == 'test') ? 'data-test.txt' : 'data.txt');
const maxIterations = (process.argv[2] == 'test') ? 2 : 18;

const rules = fs.readFileSync(path).toString().trim().split('\n').map(x => x.split(' => ').map(x => x.split('/')));
let image = ['.#.', '..#', '###'];
let size = 3;

const areSame = (arr1, arr2) => {
    if (arr1.length != arr2.length) {
        return false;
    }
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] != arr2[i]) {
            return false;
        }
    }
    return true;
}

const doFlips = (rule) => {
    // console.log([rule]);
    const preResult = [];
    const result = [];
    preResult.push(Array.from(rule[0]), Array.from(rule[0]));
    preResult[1].reverse(); //flip vertically
    preResult.push(rule[0].map(x => x.split('').reverse().join(''))); //flip horizontally

    for (let r of preResult) {
        result.push([r, rule[1]]);
    }

    // console.log(result);

    return result;
};

const doRotations = (rules) => {
    const result = [];
    for (let rule of rules) {
        result.push(Array.from(rule));
        let size = rule[0].length;
        for (let x = 0; x < 3; x++) {
            let newOne = [];
            for (let i = 0; i < size; i++) {
                newOne[i] = '';
            }
            for (let i = 0; i < size; i++) {
                for (let j = 0; j < size; j++) {
                    newOne[i] += result[result.length - 1][0][j][size - i - 1];
                }
            }
            result.push([newOne, rule[1]]);
        }
    }
    // console.log(result);
    return result;
}

const uniqueOnly = (rules) => {
    const result = [];
    for (const rule of rules) {
        let dupilcate = false;
        for (const r of result) {
            if (areSame(rule[0], r[0]) && areSame(rule[1], r[1])) {
                dupilcate = true;
            }
        }
        if (!dupilcate) {
            result.push(Array.from(rule));
        }
    }
    return result;
};

const splitSquares = (img, width) => {
    const preResult = [];
    const result = [];
    for (let x = 0; x < Math.pow(img.length / width, 2); x++) {
        preResult[x] = '';
    }
    const l = img.join('').length;
    for (let i = 0; i < l; i++) {
        const x = i % img.length;
        const y = Math.floor(i / img.length);
        const sqIdx = Math.floor(x / width) + Math.floor(y / width) * (img.length / width);
        preResult[sqIdx] += img[y][x];
    }
    for (let r of preResult) {
        for (let i = 0; i < r.length; i++) {
            if ((i + 1) % (width + 1) == 0) {
                r = r.substring(0, i) + '-' + r.substring(i);
            }
        }
        result.push(r.split('-'));
    }
    // console.log(result);
    return result;
};

const applyRules = (r, sq) => {
    // console.log(sq);
    for (const rule of r) {
        if (areSame(sq, rule[0])) {
            // console.log(rule);
            return rule[1];
        }
    }
    return 'FUCK!';
};

const combine = (squares) => {
    const width = Math.sqrt(squares.length);
    // console.log(squares);
    // console.log(width);
    const result = [];
    for (let i = 0; i < width * squares[0].length; i++) {
        result[i] = '';
    }
    for (let i = 0; i < squares.length; i++) {
        for (let j = 0; j < squares[i].length; j++) {
            result[Math.floor(i / width) * squares[0].length + j] += squares[i][j];
        }
    }
    return result;
};

const newRules = [];

for (let r of rules) {
    newRules.push(...uniqueOnly(doRotations(doFlips(r))));
}

for (let iter = 0; iter < maxIterations; iter++) {
    console.log(iter);
    // console.log(image.join('\n') + '\n');
    const blockSize = (size % 2 == 0) ? 2 : 3;
    const preSquares = splitSquares(image, blockSize);
    const squares = [];
    for (const pS of preSquares) {
        squares.push(applyRules(newRules, pS));
    }
    image = combine(squares);
    size = image.length;
}
// console.log(image.join('\n') + '\n');
console.log(image.join('').split('').filter(x => x == '#').length);
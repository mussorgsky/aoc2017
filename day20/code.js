const fs = require('fs');

let path = __dirname + '/' + ((process.argv[2] == 'test') ? 'data-test.txt' : 'data.txt');

const data = fs.readFileSync(path).toString().trim().split('\n').map(x => x.split(', ').map(x => x.substr(3).split(',').map(x => parseInt(x, 10))));
for (let d of data) {
    d[3] = true;
}

const update = (particles) => {
    for (let p of particles) {
        if (p[3] == true) {
            p[1][0] += p[2][0];
            p[1][1] += p[2][1];
            p[1][2] += p[2][2];

            p[0][0] += p[1][0];
            p[0][1] += p[1][1];
            p[0][2] += p[1][2];
        }
    }
};

const isPosSame = (p1, p2) => {
    for (let i = 0; i < 3; i++) {
        if (p1[0][i] != p2[0][i]) {
            return false;
        }
    }
    return true;
};

for (let i = 0; i < 1e5; i++) {
    update(data);
    let toRemove = [];
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data.length; j++) {
            if (i != j && data[i][3] && data[j][3]) {
                if (isPosSame(data[i], data[j])) {
                    toRemove.push(i, j);
                }
            }
        }
    }
    toRemove = new Set(toRemove);
    for (const i of toRemove) {
        data[i][3] = false;
    }
    if (i % 1e2 == 0) {
        console.log(data.filter(x => x[3] == true).length);
    }
    // if (i % 1e5 == 0) {
    //     const positions = data.map(x => x[0].reduce((prev, curr) => prev + Math.abs(curr), 0));
    //     console.log(Math.min(...positions), positions.indexOf(Math.min(...positions)));
    // }
}



console.log(data.filter(x => x[3] == true).length);
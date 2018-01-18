const fs = require('fs');

let path = __dirname + '/' + ((process.argv[2] == 'test') ? 'data-test.txt' : 'data.txt');

const states = {
    clean: 0,
    weak: 1,
    infected: 2,
    flagged: 3
}

const preMap = fs.readFileSync(path).toString().trim().split('\n').map(x => x.split('').map(x => (x == '#' ? states.infected : states.clean)));
const map = [];
let y = 0;
let x = 0;
for (const row of preMap) {
    x = -Math.floor(preMap.length / 2);
    for (const cell of row) {
        map[x++ + ',' + (y - Math.floor(preMap.length / 2))] = cell;
    }
    y++;
}

const Directions = {
    up: {
        x: 0,
        y: -1
    },
    down: {
        x: 0,
        y: 1
    },
    left: {
        x: -1,
        y: 0
    },
    right: {
        x: 1,
        y: 0
    }
}

turnLeft = (dir) => {
    switch (dir) {
        case 'up':
            return 'left';
        case 'right':
            return 'up';
        case 'down':
            return 'right';
        case 'left':
            return 'down'
    }
}

turnRight = (dir) => {
    switch (dir) {
        case 'up':
            return 'right';
        case 'right':
            return 'down';
        case 'down':
            return 'left';
        case 'left':
            return 'up'
    }
}

turnAround = (dir) => {
    switch (dir) {
        case 'up':
            return 'down';
        case 'right':
            return 'left';
        case 'down':
            return 'up';
        case 'left':
            return 'right'
    }
}

const maxBursts = 1e7;
let infects = 0;

const bug = {
    pos: {
        x: 0,
        y: 0
    },
    dir: 'up'
}

for (let b = 0; b < maxBursts; b++) {
    const position = bug.pos.x + ',' + bug.pos.y;
    const state = (map[position] === undefined) ? states.clean : map[position];
    switch (state) {
        case states.clean:
            bug.dir = turnLeft(bug.dir);
            break;
        case states.infected:
            bug.dir = turnRight(bug.dir);
            break;
        case states.flagged:
            bug.dir = turnAround(bug.dir);
            break;

    }
    if (state == states.weak) {
        infects += 1;
    }
    map[position] = (state + 1) % 4;
    bug.pos.x += Directions[bug.dir].x;
    bug.pos.y += Directions[bug.dir].y;
}

console.log(infects);
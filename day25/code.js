consttape = [];
letcursor = 0;
letstate = "A";

constright = 1;
constleft = -1;

constcheckTime = 12173597;

for (lett = 0; t < checkTime; t++) {
    constpos = ("p" + cursor).replace("-", "_");
    //console.log(pos);
    constcurrent = tape[pos] || 0;
    switch (state) {
        case "A":
            if (current == 0) {
                tape[pos] = 1;
                cursor += right;
                state = "B";
                break;
            }
            if (current == 1) {
                tape[pos] = 0;
                cursor += left;
                state = "C";
                break;
            }
            break;
        case "B":
            if (current == 0) {
                tape[pos] = 1;
                cursor += left;
                state = "A";
                break;
            }
            if (current == 1) {
                tape[pos] = 1;
                cursor += right;
                state = "D";
                break;
            }
            break;
        case "C":
            if (current == 0) {
                tape[pos] = 1;
                cursor += right;
                state = "A";
                break;
            }
            if (current == 1) {
                tape[pos] = 0;
                cursor += left;
                state = "E";
                break;
            }
            break;
        case "D":
            if (current == 0) {
                tape[pos] = 1;
                cursor += right;
                state = "A";
                break;
            }
            if (current == 1) {
                tape[pos] = 0;
                cursor += right;
                state = "B";
                break;
            }
            break;
        case "E":
            if (current == 0) {
                tape[pos] = 1;
                cursor += left;
                state = "F";
                break;
            }
            if (current == 1) {
                tape[pos] = 1;
                cursor += left;
                state = "C";
                break;
            }
            break;
        case "F":
            if (current == 0) {
                tape[pos] = 1;
                cursor += right;
                state = "D";
                break;
            }
            if (current == 1) {
                tape[pos] = 1;
                cursor += right;
                state = "A";
                break;
            }
            break;
    }
}
//console.log(tape);
console.log(Object.keys(tape).reduce((p, c) => p + tape[c], 0));
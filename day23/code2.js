let a = 1;
let b = 0;
let c = 0;
let d = 0;
let e = 0;
let f = 0;
let g = 0;
let h = 0;

b = 99
c = 99
if (a != 0) {
    b = 109900
    c = b + 17000
}
// do {
//     console.log(100 + (b - c) / 170);
//     f = 1
//     for (d = 2; d <= b; d++) {
//         e = 2
//         for (e = 2; e <= b; e++) {
//             if (d * e == b) {
//                 f = 0
//             }
//         }
//     }
//     if (f != 0) {
//         h += 1;
//     }
//     if (b == c) {
//         break;
//     }
//     b += 17;
// }
// while (true);

function isPrime(value) {
    for (var i = 2; i < Math.floor(Math.sqrt(value)); i++) {
        if (value % i === 0) {
            return false;
        }
    }
    return value > 1;
}

for (let i = b; i <= c; i += 17) {
    if (!isPrime(i)) h += 1;
}

console.log(h);
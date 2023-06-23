function squareRoot(x: number): number {
  return x ** 1 / 2;
}

function square(x: number): number {
  return x ** 2;
}

function toString(x: number): string {
  return x.toString();
}

// pipe(squareRoot);
// pipe(squareRoot, square);
// pipe(squareRoot, toString);
// pipe(square, squareRoot, toString);
// pipe(toString, squareRoot, toString); // :(

function pipe<I, O1>(f1: (x: I) => O1): (i: I) => O1;
function pipe<I, O1, O2>(f1: (x: I) => O1, f2: (x: O1) => O2): (i: I) => O2;
function pipe<I, O1, O2, O3>(f1: (x: I) => O1, f2: (x: O1) => O2, f3: (x: O2) => O3): (i: I) => O3;
// function pipe<I, O1, O2, O3, O4>(
//   f1: (x: I) => O1,
//   f2: (x: O1) => O2,
//   f3: (x: O2) => O3,
//   f4: (x: O3) => O4,
// ): (i: I) => O4;
function pipe(...args: any[]): any {}
// and so on...

const g1 = pipe(squareRoot);
const g2 = pipe(squareRoot, square);
const g3 = pipe(squareRoot, toString);
const g4 = pipe(square, squareRoot, toString);
const g5 = pipe(toString, squareRoot, toString);
const g6 = pipe(square, square, square, square); // :)

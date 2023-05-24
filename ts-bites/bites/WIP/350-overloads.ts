function add(...args: number[]): number;
function add(...args: string[]): string;
function add(...args: any[]): any {
  return {} as any;
}

add(1, 2, 3);
add("1", "2", "3");

function doStuff(): void;
function doStuff(a: string): void;
function doStuff(a: string, b: string): void;
function doStuff(a?: string, b?: string): void {}

doStuff();
doStuff("a");
doStuff("a", "b");

// Fuck me

function pipe<I, O1>(f1: (x: I) => O1): (i: I) => O1;
function pipe<I, O1, O2>(f1: (x: I) => O1, f2: (x: O1) => O2): (i: I) => O2;
function pipe<I, O1, O2, O3>(f1: (x: I) => O1, f2: (x: O1) => O2, f3: (x: O2) => O3): (i: I) => O3;
function pipe(...args: any[]): any {}
// and so on...

function squareRoot(x: number): number {
  return x ** 1 / 2;
}

function square(x: number): number {
  return x ** 2;
}

function toString(x: number): string {
  return x.toString();
}

const g1 = pipe(squareRoot);
const g2 = pipe(squareRoot, square);
const g3 = pipe(squareRoot, toString);
const g4 = pipe(square, squareRoot, toString);
const g5 = pipe(toString, squareRoot, toString);
const g6 = pipe(square, square, square, square); // :(

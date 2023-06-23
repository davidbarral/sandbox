function sum9(x: number, y: number): number;
function sum9(x: number, y: number, z: number): number;
function sum9(x: number, y: number, z?: number): number {
  return {} as any;
}

sum9(1, 2);
sum9(1, 2, 3);

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

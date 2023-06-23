function f1<T>(arg: T): void {}

function f2<T, R>(arg: T): R {
  return {} as R;
}

f1(4);
f1<number>(4);

f2(4);
f2<number, number>(5);
const r: number = f2(5);

function f3<T extends Record<string, unknown>>(arg: T): void {}

f3("s");
f3(6);
f3({ a: 1 });

function f4<T, S = number>(x: T, y: S): void {}

f4<string>("hi", 5);
f4("hi", "hi");

export {};

type SomeRecord = {
  [K: string]: number;
};

let m: SomeRecord = {
  a: 5,
  b: 6,
  c: true,
};

type Record<K extends string | number | symbol, T> = {
  [P in K]: T;
};

// type Record<K extends keyof any, T> = {

type T = keyof any;

let n: Record<string, number> = {
  a: 5,
  b: 6,
  c: true,
};

export {};

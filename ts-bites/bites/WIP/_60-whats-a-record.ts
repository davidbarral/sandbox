type SomeRecord = {
  [K: string]: number;
};

let m: SomeRecord = {
  a: 5,
  b: 6,
  c: true,
};

// type Record<K,T> =

let n: Record<string, number> = {
  a: 5,
  b: 6,
  c: true,
};

export {};

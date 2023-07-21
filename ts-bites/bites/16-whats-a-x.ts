interface Animal {
  a: number;
}

interface Mammal extends Animal {
  b: number;
}

interface Dog extends Mammal {
  c: number;
}

type Readable<T> = {
  [K in keyof T]: T[K];
};

const a: Readable<Dog> = {};

export {};

type A = "a";
type B = string;

type Animals1 = ["cat", "dog"];
type Animals2 = string[];

let animals1: Animals1 = ["dog", "cat"];
let animals2: Animals2 = ["cat", "dog", "fox"];

function f1(animals: Animals1) {
  animals.join();
}

function f2(animals: Animals2) {
  animals.join();
}

f1(["dog", "cat"]);
f2(["dog", "cat"]);

type Size = "xs" | "s" | "m" | "l";

function toEU(s: Size) {}

const s: string = "m";

toEU(s);
toEU(s as Size);

type O1 = {
  a: number;
  b: string;
};

const o2 = {
  a: 1,
  b: "B",
};

const o3 = {
  a: 1,
  b: "B",
} as const;

export {};

type A = "a";
type B = "b";

type U = A | B;

type I1 = A & B;
type I2 = A & U;

type E1 = A | any;
type E2 = A & any;

type T = any | never;
type S = any & never;

export {};

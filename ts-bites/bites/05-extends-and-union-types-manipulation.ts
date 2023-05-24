type X = 5 extends number ? true : false;

type Union = "a" | "b" | "c";

type Exclude<T, U> = T extends U ? never : T;

// type S1 = "a" extends "c" ? never : "a";
// type S2 = "b" extends "c" ? never : "b";
// type S3 = "c" extends "c" ? never : "c";
// type R = S1 | S2 | S3;

type ABUnion = Exclude<Union, "c">;

type Extract<T, U> = T extends U ? T : never;

type ABUnionAlternative = Extract<Union, "a" | "b">;

export {};

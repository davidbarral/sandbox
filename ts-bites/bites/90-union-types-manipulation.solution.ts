type Union = "a" | "b" | "c";

type Exclude<T, U> = T extends U ? never : T;

type ABUnion = Exclude<Union, "c">;

type Extract<T, U> = T extends U ? T : never;

type ABUnionAlternative = Extract<Union, "a" | "b">;

export {};

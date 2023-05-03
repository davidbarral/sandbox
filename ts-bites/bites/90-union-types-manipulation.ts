type Union = "a" | "b" | "c";

// type Exclude<T, U> =

type ABUnion = Exclude<Union, "c">;

// type Extract<T, U> =

type ABUnionAlternative = Extract<Union, "a" | "b">;

export {};

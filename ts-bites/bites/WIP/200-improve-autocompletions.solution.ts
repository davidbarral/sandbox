type Size = "xs" | "m" | Omit<string, "xs" | "m">;

let s: Size;
s = "xs";
s = "100px";

type LooseAutocompletion<T extends string> = T | Omit<string, T>;

type Size2 = LooseAutocompletion<"xs" | "s">;

let t: Size2;
t = "xs";

export {};

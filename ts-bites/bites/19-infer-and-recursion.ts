type CleanPath<T extends string> = T extends `${infer L}//${infer R}`
  ? CleanPath<`${CleanPath<L>}/${CleanPath<R>}`>
  : T extends `${infer L}//`
  ? `${CleanPath<L>}/`
  : T extends `//${infer L}`
  ? `/${CleanPath<L>}`
  : T;

type R1 = CleanPath<"p">;
type R2 = CleanPath<"/p">;
type R3 = CleanPath<"//p">;

type R4 = CleanPath<"p/">;
type R5 = CleanPath<"p//">;

type R6 = CleanPath<"/p/q">;
type R7 = CleanPath<"/p/q/">;
type R8 = CleanPath<"//p//q//">;

declare function cleanUrl<T extends string>(url: T): CleanPath<T>;

export {};

type ExtractEachCallbackArgs<T extends ReadonlyArray<any>> = {
  1: [T[0]];
  2: [T[0], T[1]];
  3: [T[0], T[1], T[2]];
  4: [T[0], T[1], T[2], T[3]];
  5: [T[0], T[1], T[2], T[3], T[4]];
  6: [T[0], T[1], T[2], T[3], T[4], T[5]];
  7: [T[0], T[1], T[2], T[3], T[4], T[5], T[6]];
  8: [T[0], T[1], T[2], T[3], T[4], T[5], T[6], T[7]];
  9: [T[0], T[1], T[2], T[3], T[4], T[5], T[6], T[7], T[8]];
  10: [T[0], T[1], T[2], T[3], T[4], T[5], T[6], T[7], T[8], T[9]];
  fallback: Array<T extends ReadonlyArray<infer U> ? U : any>;
}[T extends Readonly<[any]>
  ? 1
  : T extends Readonly<[any, any]>
  ? 2
  : T extends Readonly<[any, any, any]>
  ? 3
  : T extends Readonly<[any, any, any, any]>
  ? 4
  : T extends Readonly<[any, any, any, any, any]>
  ? 5
  : T extends Readonly<[any, any, any, any, any, any]>
  ? 6
  : T extends Readonly<[any, any, any, any, any, any, any]>
  ? 7
  : T extends Readonly<[any, any, any, any, any, any, any, any]>
  ? 8
  : T extends Readonly<[any, any, any, any, any, any, any, any, any]>
  ? 9
  : T extends Readonly<[any, any, any, any, any, any, any, any, any, any]>
  ? 10
  : "fallback"];

const c1 = (a1: number) => {};
const c2 = (a1: number, a2: string) => {};
const c11 = (
  a1: number,
  a2: string,
  a3: number,
  a4: string,
  a5: number,
  a6: string,
  a7: number,
  a8: string,
  a9: number,
  a10: string,
  a11: number,
) => {};

const c12 = (
  a1: number,
  a2: number,
  a3: number,
  a4: number,
  a5: number,
  a6: number,
  a7: number,
  a8: number,
  a9: number,
  a10: number,
  a11: number,
  a12: number,
) => {};

type P = Parameters<typeof c1>;
type R1 = ExtractEachCallbackArgs<P>;

type R2 = ExtractEachCallbackArgs<Parameters<typeof c2>>;
type R11 = ExtractEachCallbackArgs<Parameters<typeof c11>>;
type R12 = ExtractEachCallbackArgs<Parameters<typeof c12>>;

type ExtractAgain<T extends Array<any>> = Array<T extends Array<infer U> ? U : any>;

type R12Again = ExtractAgain<Parameters<typeof c11>>;

type T = {
  a: number;
  b: string | null;
  c?: boolean;
};

type Keys = keyof T;

type SameT = {
  [K in Keys]: T[K];
};

type PartialT = {
  [K in Keys]?: T[K];
};

type Partial<T> = {
  [K in keyof T]?: T[K];
};

type O = Partial<T>;

type Required<T> = {
  [K in keyof T]-?: T[K];
};

type R = Required<T>;

type Readonly<T> = {
  readonly [K in keyof T]: T[K];
};

type Ro = Readonly<T>;

type NonNullableB = T["b"] & {};

type NonNullable<T> = T & {};

type X = NonNullable<T["b"]>;

type NonNullableKeys = {
  [K in keyof T]-?: T[K] & {};
};

type PickedT = Pick<T, "a" | "b">;

type S = Exclude<number | boolean | string, number | string>;

type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

type OmmmitedT = Omit<T, "a" | "b">;
// a,b,c => omit(b,c) = pick(a,b,c - b,c)

type Exclude<T, U> = T extends U ? never : T;

type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

declare function evalMediaQuery(query: string): boolean;

function mediaMatches(queries: Record<string, string>) {
  return Object.entries(queries).reduce<Record<string, boolean>>((acc, [name, query]) => {
    acc[name] = evalMediaQuery(query);
    return acc;
  }, {});
}

const res = mediaMatches({
  phone: "max-width: 600px",
  laptop: "min-width: 600px",
});

res.missing;

type QueryRes<T extends Record<string, string>> = {
  [K in keyof T]: boolean;
};

type QR = QueryRes<{
  phone: "max-width: 600px";
  laptop: "min-width: 600px";
}>;

function saferMediaMatches<T extends Record<string, string>>(queries: T): QueryRes<T> {
  return Object.entries(queries).reduce<Record<string, Boolean>>((acc, [name, query]) => {
    acc[name] = evalMediaQuery(query);
    return acc;
  }, {}) as QueryRes<T>;
}

const saferRes = saferMediaMatches({
  phone: "max-width: 600px",
  laptop: "min-width: 600px",
});

saferRes.missing;

export {};

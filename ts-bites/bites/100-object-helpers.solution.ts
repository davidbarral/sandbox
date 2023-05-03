type O = {
  a: number;
  b?: string;
  readonly c: boolean;
};

type Partial<T> = {
  [P in keyof T]?: T[P];
};

type PartialO = Partial<O>;

type Required<T> = {
  [P in keyof T]-?: T[P];
};

type RequiredO = Required<O>;

type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type ReadonlyO = Readonly<O>;

type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

type PickedO = Pick<O, "a" | "b">;

// type Exclude<T, U> = T extends U ? never : T;
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

type OmmmitedO = Omit<O, "a" | "b">;

export {};

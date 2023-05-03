type O = {
  a: number;
  b?: string;
  readonly c: boolean;
};

// type Partial<T> =

type PartialO = Partial<O>;

// type Required<T> =

type RequiredO = Required<O>;

// type Readonly<T> =

type ReadonlyO = Readonly<O>;

// type Pick<T, K> =

type PickedO = Pick<O, "a" | "b">;

// type Omit<T, K>

type OmmmitedO = Omit<O, "a" | "b">;

export {};

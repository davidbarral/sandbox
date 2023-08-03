declare function hasLength(a: number, b: string): boolean;

type Arguments<T extends (...args: any[]) => any> = T extends (...args: infer A) => any ? A : unknown;

type ReturnType<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer R ? R : unknown;

type A = Arguments<typeof hasLength>;
type R = ReturnType<typeof hasLength>;

type EmailDomain<S extends string> = S extends `${string}@${infer Domain}` ? Domain : never;

type Trabe = EmailDomain<"david@trabe.io">;
type Opps = EmailDomain<"david">;

type ArrayTypes<T> = T extends (infer U)[] ? U : T;

type T1 = ArrayTypes<number[]>;
type T2 = ArrayTypes<(number | string)[]>;
type T3 = ArrayTypes<[1, 2, 3]>;
type T4 = ArrayTypes<[1, 2, "hola"]>;

type Events =
  | {
      type: "one";
      payload: {
        a: string;
      };
    }
  | {
      type: "two";
      payload: {
        b: boolean;
      };
    };

type ExtractPayload<Event extends { type: "one" | "two"; payload: Record<string, unknown> }> = Event extends {
  type: "one" | "two";
  payload: infer T;
}
  ? T
  : {};

type P = ExtractPayload<{ type: "one"; payload: { a: "hola" } }>;

export {};

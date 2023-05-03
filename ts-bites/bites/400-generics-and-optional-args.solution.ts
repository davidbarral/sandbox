type Event =
  | {
      type: "ONE";
      payload: { a: number };
    }
  | {
      type: "TWO";
    };

function emit<Type extends Event["type"]>(
  ...args: Extract<Event, { type: Type }> extends { payload: infer Payload }
    ? [type: Type, payload: Payload]
    : [type: Type]
) {}

emit("ONE", { a: 1 });
emit("TWO");

emit("ONE");
emit("TWO", { b: 1 });

type Events = {
  ONE: { a: number };
  TWO: never;
};

function emit2<K extends keyof Events>(...args: Events[K] extends never ? [type: K] : [type: K, payload: Events[K]]) {}

emit2("ONE", { a: 1 });
emit2("TWO");

emit2("ONE");
emit2("TWO", { b: 1 });

export {};

type Event =
  | {
      type: "ONE";
      payload: { a: number };
    }
  | {
      type: "TWO";
    };

function emit(event: Event["type"], payload?: any) {}

emit("ONE", { a: 1 });
emit("TWO");

emit("ONE");
emit("TWO", { b: 1 });

export {};

import "./500-global-scope";

// function emit<K extends keyof Events>(...args: Events[K] extends never ? [type: K] : [type: K, payload: Events[K]]) {}

emit("ONE", { a: 1 });
emit("TWO");

declare global {
  interface Events {
    THREE: { b: boolean };
  }
}

emit("THREE", { b: false });

export {};

declare global {
  interface Events {
    ONE: { a: number };
    TWO: never;
  }

  function emit<K extends keyof Events>(...args: Events[K] extends never ? [type: K] : [type: K, payload: Events[K]]) {}
}

export {};

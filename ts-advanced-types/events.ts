type Callback<T extends any[]> = (...args: T) => void;

interface EventTypes {
  ev1: [number, number];
  ev2: [string];
}

const eventBus = () => {
  const handlers: { [K in keyof EventTypes]?: Callback<EventTypes[K]>[] } = {};

  const on = <K extends keyof EventTypes>(event: K, cb: Callback<EventTypes[K]>) => {
    const cbs = handlers[event] ?? [];
    cbs.push(cb);
    handlers[event] = cbs;
  };

  const emit = <K extends keyof EventTypes>(event: K, ...args: EventTypes[K]) => {
    handlers[event]?.forEach((cb) => {
      cb(...args);
    });
  };

  return {
    on,
    emit,
  };
};

const bus = eventBus();

bus.on("ev1", (a, b) => {
  console.log("custom", a, b);
});

bus.emit("ev1", 1, 2);

bus.on("ev2", (a) => {
  console.log(a);
});

bus.emit("ev2", "hola");

interface EventTypes {
  custom: [boolean];
}

bus.on("custom", (b) => console.log(b));
bus.emit("custom", true);

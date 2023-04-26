type Callback<T extends any[]> = (...args: T) => void;

type DefaultEventTypes = {
  ev1: [a: number, b: number];
  ev2: [s: string];
};

const eventBus = <EventTypes extends Record<string, any[]> = DefaultEventTypes>() => {
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
// const bus = eventBus<DefaultEventTypes>();

bus.on("ev1", (a, b) => {
  console.log("custom", a, b);
});

bus.emit("ev1", 1, 2);

bus.on("ev2", (a) => {
  console.log(a);
});

bus.emit("ev2", "hola");

type CustomEventTypes1 = {
  custom1: [b: boolean];
};

type CustomEventTypes2 = {
  custom2: [];
};

const bus2 = eventBus<DefaultEventTypes & CustomEventTypes1 & CustomEventTypes2>();

bus2.on("custom1", (b) => console.log(b));
bus2.emit("custom1", true);

bus2.on("custom2", () => console.log());
bus2.emit("custom2");

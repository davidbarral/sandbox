type Callback<T extends any[]> = (...args: T) => void;

type DefaultEventTypes = {
  ["service.start"]: [port: number, host: string, secure: boolean];
  ["service.stop"]: [signal: string];
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

export { eventBus };

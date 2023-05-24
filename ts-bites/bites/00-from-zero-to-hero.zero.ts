type Callback = (...args: any[]) => void;

const eventBus = () => {
  const handlers: Record<string, Callback[]> = {};

  const on = (event: string, cb: Callback) => {
    const cbs = handlers[event] ?? [];
    cbs.push(cb);
    handlers[event] = cbs;
  };

  const emit = (event: string, ...args: any[]) => {
    handlers[event]?.forEach((cb: Callback) => {
      cb(...args);
    });
  };

  return {
    on,
    emit,
  };
};

export { eventBus };

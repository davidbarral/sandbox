const eventBus = () => {
  const handlers = {};

  const on = (event, cb) => {
    const cbs = handlers[event] ?? [];
    cbs.push(cb);
    handlers[event] = cbs;
  };

  const emit = (event, ...args) => {
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

bus.on("custom", (a, b) => {
  console.log("custom", a, b);
});

bus.emit("custom", 1, 2);

import asyncHooks from "node:async_hooks";
import Koa from "koa";
import { v4 as uuidv4 } from "uuid";
import fetch from "node-fetch";

const port = parseInt(process.env.PORT ?? "5000");

const asyncLocalStorage = new asyncHooks.AsyncLocalStorage();

const traceHook = asyncHooks.createHook({
  init: (asyncId, _, triggerAsyncId) => {
    console.log("[INIT]", asyncId, "(parent:", triggerAsyncId, ")");
  },
  destroy: (asyncId) => {
    console.log("[DESTROY]", asyncId);
  },
});

const fetchData = async () => {
  const requestId = "???";
  const res = await fetch(`http://localhost:${port + 1}`, {
    headers: {
      "x-id": requestId,
    },
  });

  return await res.json();
};

const fetchData2 = async ({ ctx }) => {
  const res = await fetch(`http://localhost:${port + 1}`, {
    headers: {
      "x-id": ctx.state.requestId,
    },
  });

  return await res.json();
};

const fetchData3 = async () => {
  const ctx = asyncLocalStorage.getStore().get("ctx");
  const res = await fetch(`http://localhost:${port + 1}`, {
    headers: {
      "x-id": ctx.state.requestId,
    },
  });

  return await res.json();
};

const app1 = new Koa();

app1.use(async (ctx, next) => {
  await asyncLocalStorage.run(new Map(), async () => {
    await next();
  });
});

app1.use(async (ctx, next) => {
  const requestId = uuidv4();
  console.log("Request id", requestId);
  ctx.state.requestId = requestId;
  asyncLocalStorage.getStore().set("ctx", ctx);
  await next();
});

app1.use(async (ctx) => {
  // const data = await fetchData();
  // const data = await fetchData2({ ctx });
  const data = await fetchData3();
  ctx.status = 200;
  ctx.body = { res: data };
});

const app2 = new Koa();

app2.use(async (ctx) => {
  console.log(`Request from ${ctx.get("x-id")}`);
  ctx.status = 200;
  ctx.body = { data: "DATA" };
});

const app3 = new Koa();

const p1 = () =>
  new Promise((resolve) => {
    console.log(">> Inside p1", asyncHooks.executionAsyncId());
    resolve();
  });

const p2 = () =>
  new Promise((resolve) => {
    console.log(">> Inside p2", asyncHooks.executionAsyncId());
    resolve();
  });

app3.use(async (ctx) => {
  traceHook.enable();
  console.log(">> Handler ------------- ", asyncHooks.executionAsyncId());
  await Promise.resolve().then(p1()).then(p2);
  ctx.status = 200;
  traceHook.disable();
});

app1.listen(port, () => {
  console.log(`App 1 ready on port ${port}`);
});

app2.listen(port + 1, () => {
  console.log(`App 2 ready on port ${port + 1}`);
});

app3.listen(port + 2, () => {
  console.log(`App 3 ready on port ${port + 2}`);
});

import Koa from "koa";
import Router from "@koa/router";
import prometheus from "prom-client";
import { setTimeout } from "timers/promises";

const port = process.env.PORT ?? 3000;
const id = process.env.ID;

const counter = new prometheus.Counter({
  name: "request_count",
  help: "Number of requests made to the /test endpoint",
  labelNames: ["id", "status"],
});

const gauge = new prometheus.Gauge({
  name: "request_gauge",
  help: "Active requests",
});

const fetchRequestDurationMillis = new prometheus.Histogram({
  name: "request_duration_millis",
  help: "Duration in milliseconds of each request served",
  labelNames: ["id", "status"],
  buckets: [1, 10, 100, 500, 1000, 5000],
});

const fetchRequestDurationMillisAlt = new prometheus.Summary({
  name: "request_duration_millis_alt",
  help: "Duration in milliseconds each request served",
  labelNames: ["id", "status"],
  maxAgeSeconds: 600,
  ageBuckets: 5,
});

new Koa()
  .use(
    new Router()
      .use(async (ctx, next) => {
        const start = process.hrtime();
        gauge.inc();
        try {
          await next();
        } finally {
          gauge.dec();
          counter.inc({ id, status: ctx.status });
          const [seconds, nanoseconds] = process.hrtime(start);
          const duration = seconds * 1000 + nanoseconds / 1000000;
          fetchRequestDurationMillis.observe({ id, status: ctx.status }, duration);
          fetchRequestDurationMillisAlt.observe({ id, status: ctx.status }, duration);
        }
      })
      .get("/test", async (ctx) => {
        await setTimeout(Math.random() * 3000);
        const ok = Math.random() > 0.3;
        ctx.status = ok ? 200 : 500;
      })
      .get("/metrics", async (ctx) => {
        console.log("Scrapped", new Date());
        ctx.body = await prometheus.register.metrics();
        ctx.status = 200;
      })
      .middleware(),
  )
  .listen(port, () => {
    console.log(`[${id}] Listening on port ${port}`);
  });

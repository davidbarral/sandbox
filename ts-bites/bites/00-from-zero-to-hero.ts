// evento - payload
// service.start  { port: number, host: string, secure: boolean }
// service.stop { signal: string };

//import { eventBus } from "./00-from-zero-to-hero.zero";
import { eventBus } from "./00-from-zero-to-hero.hero";

const bus = eventBus();

bus.on("service.start", (port, host, secure) => {
  console.log(`Service started at http${secure ? "s" : ""}://${host}:${port}`);
});

bus.on("service.stop", (signal) => {
  console.log(`Service stopped. Received ${signal}`);
});

bus.on("service.start", (port, host, secure) => {});

bus.on("unknown", (a, b) => {});

export {};

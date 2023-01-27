import prometheus from "prom-client";

const gateway = new prometheus.Pushgateway("http://prometheus-pushgateway:9091");

const counter = new prometheus.Counter({
  name: "batch_count",
  help: "Number of batch jobs",
});

counter.inc();

await gateway.push({ jobName: "batch" });

console.log("Done!");

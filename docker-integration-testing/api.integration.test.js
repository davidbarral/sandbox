import { it, expect, beforeAll, vi } from "vitest";
import { counter, gateway, metrics } from "./api.js";
import { dockerEnv, startPrometheusGateway } from "./docker-testing.js";

const gatewayHost = `http://localhost:${dockerEnv.PROMETHEUS_GATEWAY_PORT}`;

beforeAll(async () => {
  await startPrometheusGateway();
});

it("pushes metrics", async () => {
  const testCounter = counter({ name: "test_counter", help: "a counter" });
  const inc = Math.round(Math.random() * 1000);
  testCounter.inc(inc);

  const testGateway = gateway({ endpoint: gatewayHost });
  const { resp } = await testGateway.push({ jobName: "test" });
  expect(resp.statusCode).toBe(200);

  const res = await fetch(`${gatewayHost}/metrics`);
  const text = await res.text();

  const expected = new RegExp(
`# HELP test_counter a counter
# TYPE test_counter counter
test_counter{instance="",job="test"} ${inc}`
  ,"m");

  expect(text).toMatch(expected);
});

import { it, expect, beforeAll, vi } from "vitest";
import { counter, gateway, metrics } from "./api.js";
import { pushMock } from "prom-client";

vi.mock("prom-client", async () => {
  const pushMock = vi.fn();

  class Pushgateway {
    constructor(endpoint) {
      this.endpoint = endpoint;
    }

    push(...args) {
      pushMock(this.endpoint, ...args);
      return { resp: { statusCode: 200 }};
    }
  }

  return ({
  ...(await vi.importActual("prom-client")),
    Pushgateway,
    pushMock,
  });
});

it("pushes metrics?", async () => {
  const testCounter = counter({ name: "test_counter", help: "a counter" });
  const inc = Math.round(Math.random() * 1000);
  testCounter.inc(inc);

  const state = await metrics();

  const expected = new RegExp(
`# HELP test_counter a counter
# TYPE test_counter counter
test_counter ${inc}`
  ,"m");

  expect(state).toMatch(expected);

  const testGateway = gateway({ endpoint: "http://some.fake.host" });
  const { resp } = await testGateway.push({ jobName: "test" });
  expect(resp.statusCode).toBe(200);

  expect(pushMock).toHaveBeenCalledTimes(1);
  expect(pushMock).toHaveBeenCalledWith("http://some.fake.host", { jobName: "test" });
});

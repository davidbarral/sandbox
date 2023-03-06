import * as prometheus from "prom-client";

export const counter = ({ name, help }) =>
  new prometheus.Counter({
    name,
    help,
  });

export const gateway = ({ endpoint }) => {
  return new prometheus.Pushgateway(endpoint);
};

export const metrics = async () => {
  return await prometheus.register.metrics();
};

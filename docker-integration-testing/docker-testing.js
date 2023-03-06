import fs from "node:fs";
import * as url from "node:url";
import { setTimeout } from "node:timers/promises";
import fetch from "node-fetch";
import compose from "docker-compose";

const LINE =
  /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/gm;

function parse(lines) {
  const obj = {};

  lines = lines.replace(/\r\n?/gm, "\n");

  let match;
  while ((match = LINE.exec(lines)) != null) {
    const key = match[1];
    if (key) {
      let value = match[2] || "";
      value = value.trim();

      const maybeQuote = value[0];
      value = value.replace(/^(['"`])([\s\S]*)\1$/gm, "$2");

      if (maybeQuote === '"') {
        value = value.replace(/\\n/g, "\n");
        value = value.replace(/\\r/g, "\r");
      }

      obj[key] = value;
    }
  }

  return obj;
}

const dockerEnvFile = url.fileURLToPath(new URL(".env", import.meta.url));
const dockerEnv = parse(fs.readFileSync(dockerEnvFile).toString());

const startService = async (service) => {
  await compose.upOne(service, {
    cwd: url.fileURLToPath(new URL(".", import.meta.url)),
  });
};

const waitForHealth = async (service, port) => {
  let tries = 0;
  let ready = false;

  while (!ready && tries < 10) {
    try {
      const res = await fetch(`http://localhost:${port}/-/ready`);

      if (res.status === 200) {
        ready = true;
      } else {
        await setTimeout(500);
        tries++;
      }
    } catch (_e) {
      await setTimeout(500);
      tries++;
    }
  }
};

const startPrometheusGateway = async () => {
    await startService("prometheus-pushgateway");
    await waitForHealth("prometheus-pushgateway", dockerEnv.PROMETHEUS_GATEWAY_PORT);
};

export { dockerEnv, startPrometheusGateway};

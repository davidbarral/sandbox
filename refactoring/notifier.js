const { postMessage } = require("./trello.js");

const personSalary = {
  check: ({ bucket, key }) => bucket === "people" && /^\/nominas\//.test(key),
  notify: ({ bucket, key }) => {
    const [_, login, year, month] = key.match(/^\/nominas\/(\S+?)\/(\d{4})\/(\w+)\.pdf$/);
    postMessage({
      channels: ["david.barral"],
      message: `Nueva nómina de ${month} ${year}`,
    });
  },
};

const personDocument = {
  check: ({ bucket, key }) => bucket === "people" && /^\/documents\//.test(key),

  notify: ({ bucket, key }) => {
    const [_, login, doc] = key.match(/^\/documents\/(\S+?)\/(\S+)$/);
    postMessage({ channels: [login], message: `Nuevo documento ${doc}` });
  },
};

const projectDocument = {
  check: ({ bucket }) => bucket === "projects",
  notify: ({ bucket, key }) => {
    const [_, project, doc] = key.match(/^\/(\S+?)\/(\S+)$/);
    postMessage({ channels: [project], message: `Nuevo documento: ${doc}` });
  },
};

const notifiers = [personSalary, personDocument, projectDocument];

const notifyUpload = (upload) => {
  const notifier = notifiers.find(({ check }) => check(upload));

  if (!notifier) {
    throw new Error(`Cannot process ${upload.bucket}/${upload.key}`);
  }

  notifier.notify(upload);
};

module.exports = { notifyUpload };

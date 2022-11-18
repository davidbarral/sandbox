const { postMessage } = require("./trello.js");

const isPersonSalary = ({ bucket, key }) => bucket === "people" && /^\/nominas\//.test(key);

const isPersonDocument = ({ bucket, key }) => bucket === "people" && /^\/documents\//.test(key);

const isProjectDocument = ({ bucket }) => bucket === "projects";

const nofityPersonSalary = ({ bucket, key }) => {
  const [_, login, year, month] = key.match(/^\/nominas\/(\S+?)\/(\d{4})\/(\w+)\.pdf$/);
  postMessage({
    channels: ["david.barral"],
    message: `Nueva nómina de ${month} ${year}`,
  });
};

const notifyPersonDocument = ({ bucket, key }) => {
  const [_, login, doc] = key.match(/^\/documents\/(\S+?)\/(\S+)$/);
  postMessage({ channels: [login], message: `Nuevo documento ${doc}` });
};

const notifyProjectDocument = ({ bucket, key }) => {
  const [_, project, doc] = key.match(/^\/(\S+?)\/(\S+)$/);
  postMessage({ channels: [project], message: `Nuevo documento: ${doc}` });
};

const notifyUpload = (upload) => {
  if (isPersonSalary(upload)) {
    nofityPersonSalary(upload);
  } else if (isPersonDocument(upload)) {
    notifyPersonDocument(upload);
  } else if (isProjectDocument(upload)) {
    notifyProjectDocument(upload);
  } else {
    throw new Error(`Cannot process ${upload.bucket}/${upload.key}`);
  }
};

module.exports = { notifyUpload };

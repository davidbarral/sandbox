const { postMessage } = require("./trello.js");

const notifyUpload = ({ bucket, key }) => {
  if (bucket === "people") {
    if (/^\/nominas\//.test(key)) {
      const [_, login, year, month] = key.match(/^\/nominas\/(\S+?)\/(\d{4})\/(\w+)\.pdf$/);
      postMessage({
        channels: ["david.barral"],
        message: `Nueva nómina de ${month} ${year}`,
      });
    } else if (/^\/documents\//.test(key)) {
      const [_, login, doc] = key.match(/^\/documents\/(\S+?)\/(\S+)$/);
      postMessage({ channels: [login], message: `Nuevo documento ${doc}` });
    } else {
      throw new Error(`Cannot process people${key}`);
    }
  } else if (bucket === "projects") {
    const [_, project, doc] = key.match(/^\/(\S+?)\/(\S+)$/);
    postMessage({ channels: [project], message: `Nuevo documento: ${doc}` });
  } else {
    throw new Error(`Cannot process ${bucket}`);
  }
};

module.exports = { notifyUpload };

const { notifyUpload } = require("./notifier.js");

notifyUpload({
  bucket: "people",
  key: "/nominas/david.barral/2022/octubre.pdf",
});

notifyUpload({
  bucket: "people",
  key: "/documents/david.barral/nif.pdf",
});

notifyUpload({
  bucket: "projects",
  key: "/meccano/how-to-solve-stuff.pdf",
});

const mockPostMessage = jest.fn();

jest.mock("./trello.js", () => ({
  postMessage: mockPostMessage,
}));

const { notifyUpload } = require("./notifier.js");

describe("notifier", () => {
  it("works", () => {
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

    expect(mockPostMessage.mock.calls).toMatchInlineSnapshot(`
[
  [
    {
      "channels": [
        "david.barral",
      ],
      "message": "Nueva nómina de octubre 2022",
    },
  ],
  [
    {
      "channels": [
        "david.barral",
      ],
      "message": "Nuevo documento nif.pdf",
    },
  ],
  [
    {
      "channels": [
        "meccano",
      ],
      "message": "Nuevo documento: how-to-solve-stuff.pdf",
    },
  ],
]
`);
  });
});

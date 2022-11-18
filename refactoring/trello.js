const postMessage = ({ channels, message }) => {
  channels.forEach((channel) => {
    console.log(`> Slackbot message to ${channel}: ${message}`);
  });
};

module.exports = { postMessage };

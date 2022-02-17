const app = require("./app");
const mongoose = require("mongoose");
const config = require("./config/config");
const logger = require("./config/logger");
const { env } = require("./config/config");
const SocketController = require("./utils/socket");
// const io = require("socket.io");

let server;
server = require("http").createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  if (config.env === "development") {
    logger.info("Connected to Development MongoDB");
  } else {
    logger.warn("Connected to Production MongoDB");
  }
  server.listen(config.port, () => {
    logger.info(`Listening on port ${config.port}`);
  });
  // server = app.listen(config.port, () => {
  //   logger.info(`Listening on port ${config.port}`);
  // });
});

// const io = require("socket.io")
const socketController = new SocketController(io);
io.on("connection", (socket) => socketController.connection(socket));

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

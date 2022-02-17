const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const httpStatus = require("http-status");
const config = require("./config/config");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const compression = require("compression");
const routes = require("./routes");
const ApiError = require("./utils/APIError");
const { errorConverter, errorHandler } = require("./middlewares/error");
const morgan = require("./config/morgan");
const path = require("path");
const http = require("http");
const app = express();

if (config.env !== "test") {
  if (config.env !== "test") {
    app.use(morgan.successHandler);
    app.use(morgan.errorHandler);
  }
}
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(xss());
app.use(mongoSanitize());
app.use(compression());
app.use(cors());
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "client", "build")));
app.options("*", cors());

app.use("/assets", express.static(path.join(__dirname, path.join("uploads"))));
app.use("/api", routes);

// app.get("/*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client", "build", "index.html"));
// });

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// const server = http.createServer(app);


// io.on("connection", (socket) => {
//   socket.emit("hello World");
// });

app.use(errorConverter);
app.use(errorHandler);

module.exports = app;

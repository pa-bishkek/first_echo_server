const http = require("http");
const url = require("url");
const querystring = require("querystring");
//
const winston = require("winston");
const { index, about, error404, staticImage } = require("./handlers.js");

const PORT = 8000;

const logger = winston.createLogger({
  level: "debug",
  transports: [new winston.transports.Console()]
});

const server = http.createServer();

server.on("connection", () => {
  logger.info("New connection");
});

server.on("request", (req, res) => {
  const purl = url.parse(req.url);
  const query = purl.query;
  const pathname = purl.pathname;
  const params = querystring.parse(query);
  switch (pathname) {
    case "/about":
      about(req, res);
      break;
    case "/image":
      staticImage(req, res);
      break;
    case "/":
      index(req, res);
      break;
    default:
      error404(req, res);
  }
});

server.on("request", (req, res) => {
  console.log("New request");
});

server.on("listening", () => {
  logger.info(`Server is started! Port: ${PORT}`);
});

server.listen(PORT);

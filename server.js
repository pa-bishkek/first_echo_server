const http = require("http");
const url = require("url");
const querystring = require("querystring");
const winston = require("winston");

const logger = winston.createLogger({
  level: "debug",
  transports: [new winston.transports.Console()]
});

const server = http.createServer((req, res) => {
  const _url = req.url;
  const query = url.parse(_url).query;
  const params = querystring.parse(query);
  const about_request = {
    method: req.method,
    headers: req.headers,
    url: req.url,
    params
  };
  res.end(JSON.stringify(about_request, undefined, " "));
});

server.on("listening", () => {
  logger.info("Server is started!");
});

server.listen(8000);

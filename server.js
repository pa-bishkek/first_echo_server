const http = require("http");
const url = require("url");
const querystring = require("querystring");
//
const winston = require("winston");
const {
    index,
    about,
    error404,
    staticImage,
    staticFiles
} = require("./handlers.js");

const PORT = 8000;

const logger = winston.createLogger({
    level: "debug",
    transports: [new winston.transports.Console()]
});

const server = http.createServer();

server.on("connection", () => {
    logger.info("New connection");
});

const routes = [
    [/^\/about$/gi, about],
    [/^\/image$/gi, staticImage],
    [/^\/static/gi, staticFiles],
    [/^\/$/gi, index]
];

server.on("request", (req, res) => {
    const purl = url.parse(req.url);
    req.URL = purl;
    const query = purl.query;
    const pathname = purl.pathname; // /about /iamge / /sljdf/sljfl
    const params = querystring.parse(query);
    let has_match = false;
    routes.forEach(([regex, handler]) => {
        if (has_match) return;
        if (regex.test(pathname)) {
            has_match = true;
            handler(req, res);
        }
    });
    if (!has_match) {
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

const fs = require("fs");
const path = require("path");

const serveFile = (path, req, res) => {
    const fstream = fs.createReadStream(path);
    fstream.pipe(res);
    fstream.on("data", chunk => {
        console.log(chunk);
    });
    fstream.on("end", () => {
        res.end();
    });
    fstream.on("error", () => {
        res.end("=(");
    });
};

const about = (req, res) => {
    res.end("<h1>About</h1>");
};

const index = (req, res) => {
    res.end("<h1>Index</h1>");
};

const error404 = (req, res) => {
    res.end("<h1>404 Not Found!</h1>");
};

const staticImage = (req, res) => {
    console.log(req.URL.pathname);
    const fstream = fs.createReadStream(
        path.join(process.cwd(), "./static/images/image.jpg")
    );
    fstream.pipe(res);
    fstream.on("data", chunk => {
        console.log(chunk);
    });
    fstream.on("end", () => {
        res.end();
    });
    fstream.on("error", () => {
        res.end("=(");
    });
};

const staticFiles = (req, res) => {
    console.log(req.URL.pathname);
    // Получаем абсолютный путь до файла на основании нашей текущей рабочей директории и пути из req.url
    abs_path = path.join(process.cwd(), req.URL.pathname);
    // Запрашиваем информацию о файле
    fs.stat(abs_path, (err, fs_stats) => {
        if (err) {
            error404(req, res);
        } else {
            serveFile(abs_path, req, res);
        }
    });
};

module.exports = {
    about,
    index,
    error404,
    staticImage,
    staticFiles
};

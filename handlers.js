const fs = require("fs");
const path = require("path");

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
    abs_path = path.join(process.cwd(), req.URL.pathname);
    fs.stat(abs_path, (err, fs_stats) => {
        if (err) {
            error404(req, res);
        } else {
            const fstream = fs.createReadStream(abs_path);
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

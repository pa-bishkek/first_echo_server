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
  const fstream = fs.createReadStream(
    path.join(process.cwd(), "./static/image.jpg")
  );
  fstream.pipe(res);
  fstream.on("data", chunk => {
    console.log(chunk);
  });
  fstream.on("end", () => {
    res.end();
  });
};

module.exports = {
  about,
  index,
  error404,
  staticImage
};

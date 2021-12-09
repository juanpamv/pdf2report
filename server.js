const express = require("express");
const fileUpload = require("express-fileupload");
var pdf2Text = require("pdf2text");

const app = express();

app.use(fileUpload());

const uploadFile = (req, res) => {};

const pdfToJson = () => {};

var pathToPdf = "./src/pdf/ESQUEMA_DE_BENEFICIOS_ASERECKITT_SALUD.pdf";

app.get("/text/:path", (req, res) => {
  const path = `.${req.params.path.replaceAll("-", "/")}`;
  console.log(path);

  pdf2Text(path).then(function (pages) {
    console.log("hello");
    console.log(pages);
    //pages is an array of string arrays
    //loosely corresponding to text objects within the pdf
    res.json(pages);
  });
});

// Upload endpoint
app.post("/upload", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file was uploaded" });
  }

  const file = req.files.file;

  file.mv(`${__dirname}/client/public/uploads/${file.name}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});

app.listen(5000, () => console.log("Server started..."));

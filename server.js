const express = require("express");
const fileUpload = require("express-fileupload");
var pdf2Text = require("pdf2text");

const PDFExtract = require("pdf.js-extract").PDFExtract;
const pdfExtract = new PDFExtract();

const app = express();

app.use(fileUpload());

app.get("/text/:path", (req, res) => {
  const path = `.${req.params.path.replaceAll("-", "/")}`;
  const options = {
    verbosity: 100,
    disableCombineTextItems: false,
    normalizeWhitespace: true,
  };

  if (path.includes("ESQUEMA_DE_BENEFICIOS")) {
    pdf2Text(path).then(function (pages) {
      //console.log(1);
      res.json(pages);
    });
  } else {
    pdfExtract.extract(path, options, (err, data) => {
      if (err) return console.log(err);
      //console.log(2);
      res.json(
        data.pages.map((page) =>
          page.content
            .filter((line) => {
              if (line.str !== " ") return line.str;
            })
            .map((line) => line.str)
        )
      );
    });
  }
});

// Upload endpoint
app.post("/upload", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file was uploaded" });
  }

  const files = req.files.file0;
  const date = Date.now();

  console.log(files);
  for (let index = 0; index < files.length; index++) {
    const file = files[index];

    file.mv(`${__dirname}/uploads/${date}_${file.name}`, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
      console.log("success");
    });
  }

  const response = files.map((item) => {
    return {
      fileName: `${date}_${item.name}`,
      filePath: `/uploads/${date}_${item.name}`,
    };
  });

  console.log(response);
  res.json(response);
});

app.listen(5000, () => console.log("Server started..."));

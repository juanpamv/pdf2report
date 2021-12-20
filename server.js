const express = require("express");
const fileUpload = require("express-fileupload");
var pdf2Text = require("pdf2text");
const reader = require("xlsx-style");

const PDFExtract = require("pdf.js-extract").PDFExtract;
const pdfExtract = new PDFExtract();

const app = express();

app.use(fileUpload());

app.get("/text/:path", (req, res) => {
  const path = `.${req.params.path.replaceAll("-", "/")}`;
  console.log(path);
  const options = {
    verbosity: 100,
    disableCombineTextItems: false,
    normalizeWhitespace: true,
  };

  if (path.includes("ESQUEMA_DE_BENEFICIOS")) {
    pdf2Text(path).then(function (pages) {
      console.log("tipo 1:");
      res.json(pages);
    });
  } else {
    pdfExtract.extract(path, options, (err, data) => {
      console.log("tipo 2:");
      if (err) return console.log(err);
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
  console.log(files);

  for (let index = 0; index < files.length; index++) {
    const file = files[index];

    file.mv(`${__dirname}/uploads/${Date.now()}_${file.name}`, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
      console.log("success");
    });
  }

  const response = files.map((item) => {
    return {
      fileName: `${Date.now()}_${item.name}`,
      filePath: `/uploads/${Date.now()}_${item.name}`,
    };
  });

  res.json(response);
});

// Upload endpoint
app.get("/generate-file", (req, res) => {
  const file = reader.readFile(
    `${__dirname}/template/DETALLE_DE_COBERTURAS.xls`,
    { bookType: "xls", cellStyles: true, sheetStubs: true }
  );

  // Sample data set
  let student_data = [
    {
      Student: "Nikhil",
      Age: 22,
      Branch: "ISE",
      Marks: 70,
    },
    {
      Name: "Amitha",
      Age: 21,
      Branch: "EC",
      Marks: 80,
    },
  ];

  //const ws = reader.utils.json_to_sheet(student_data);

  //reader.utils.book_append_sheet(file, ws, "Sheet3");

  // Writing to our file
  reader.writeFile(file, "./test.xlsx");

  res.json(file);
});

app.listen(5000, () => console.log("Server started..."));

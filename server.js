const express = require("express");
const fileUpload = require("express-fileupload");
var pdf2Text = require("pdf2text");

const app = express();

app.use(fileUpload());

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

  const files = req.files.file0;
  console.log(files);

  for (let index = 0; index < files.length; index++) {
    const file = files[index];

    file.mv(`${__dirname}/uploads/${file.name}`, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
      console.log("success");
    });
  }

  const response = files.map((item) => {
    return { fileName: item.name, filePath: `/uploads/${item.name}` };
  });

  res.json(response);
});

app.listen(5000, () => console.log("Server started..."));

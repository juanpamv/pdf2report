const express = require("express");
const fileUpload = require("express-fileupload");
var pdf2Text = require("pdf2text");
const ejs = require("ejs");
const fs = require("fs-extra");
const zlib = require("zlib");
const gzip = zlib.createGzip();

const app = express();

app.use(fileUpload());

app.get("/text/:path", (req, res) => {
  const path = `.${req.params.path.replaceAll("-", "/")}`;
  console.log(path);

  pdf2Text(path).then(function (pages) {
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

const templateSourcePath = "xslx-template";
const sharedStrings = "/xl/sharedStrings.xml";
const sheet1 = "/xl/worksheets/sheet1.xml";
const sheet2 = "/xl/worksheets/sheet2.xml";
const sheet3 = "/xl/worksheets/sheet3.xml";

app.get("/produce-xslx", (req, res) => {
  try {
    const sessionKey = "session1"; // TODO obtain session key from request

    const destinationPath = setupXSLXTempDir(sessionKey);

    const values = {
      area_geografica_cobertura: "Parrita",
    };

    renderTemplatedFile(
      templateSourcePath + sharedStrings,
      destinationPath + sharedStrings,
      values
    );
    renderTemplatedFile(
      templateSourcePath + sharedStrings,
      destinationPath + sheet1,
      values
    );
    renderTemplatedFile(
      templateSourcePath + sharedStrings,
      destinationPath + sheet2,
      values
    );
    renderTemplatedFile(
      templateSourcePath + sharedStrings,
      destinationPath + sheet3,
      values
    );

    const input = fs.createReadStream(destinationPath);
    const output = fs.createWriteStream(destinationPath + ".xslx");
    input.pipe(gzip).pipe(output);

    res.send(result);
  } catch (err) {
    console.error(err);
  }
});

function setupXSLXTempDir(sessionID) {
  const tmpTemplatePath = "tmp/xslx-template-" + sessionID;
  fs.removeSync(tmpTemplatePath);
  fs.copySync(templateSourcePath, tmpTemplatePath);
  fs.removeSync(tmpTemplatePath + sharedStrings);
  fs.removeSync(tmpTemplatePath + sheet1);
  fs.removeSync(tmpTemplatePath + sheet2);
  fs.removeSync(tmpTemplatePath + sheet3);
  return tmpTemplatePath;
}

function renderTemplatedFile(sourceTemplate, destinationFile, values) {
  const template = fs.readFileSync(sourceTemplate, "utf-8");
  const result = ejs.render(template, values);
  fs.outputFileSync(destinationFile, result);
}

app.listen(5000, () => console.log("Server started..."));

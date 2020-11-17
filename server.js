const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const { download } = require("./download.js");
const { uploadToGithub } = require("./github.js");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get('/',(req,res) => {
  res.send('test')
})

app.post("/", (req, res) => {
  const url = req.body.url ? req.body.url : null;

  if (url) {
    download(url, downloadInfos => {
      uploadToGithub(downloadInfos.tempName, indexEndpoint => {
        removeDir(downloadInfos.internFilepath, () => {
          res.json({ success: true, indexEndpoint });
        });
      });
    });
  } else {
    res.status(400).json({ success: false });
  }
});

function removeDir(dir, cb) {
  fs.rmdir(dir, { recursive: true }, err => {
    if (err) {
      throw err;
    }
    cb();
  });
}

app.listen(5000, () => console.log("server started"));

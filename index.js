const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const decs = require("./decs.json");
const abc = require("./abc.json");
const app = express();
const fs = require("fs");
const urlEncodedParser = bodyParser.urlencoded({ extended: false });
app.use(cors());

var __dirname = path.resolve(path.dirname(""));
var filePath = path.join(__dirname, "decs.json");
app.get("/", (req, res) => {
  res.sendFile(filePath, function (err) {
    if (err) {
      next(err);
    } else {
      console.log("Sent:", filePath);
    }
  });
});
app.post("/addmovies", urlEncodedParser, (req, res) => {
  const title = req.body.title;
  poster_path = req.body.poster_path;
  const movies = {
    title: title,
    poster_path: poster_path,
  };
  const valu = poster_path.match(/^https?:\/\/.+\/.+$/);
  console.log("Valu is: ", valu);
  if (valu === null) {
    res.send("<h2 style='margin:0.7rem'>Error occured while saving the image URL</h2><br/><a style='text-decoration:none;margin:0.7rem;font-weight:bold' link='https://movieflix3112.netlify.app'>Go back</a>");
  } else {
    // console.log(title, poster_path);
    fs.readFile("./decs.json", function (err, data) {
      if (err) throw err;
      var data1 = JSON.parse(data);
      data1.push(movies);
      console.log(data1.title);
      fs.writeFile("./decs.json", JSON.stringify(data1), (err) => {
        if (err) console.log(err);
        else {
          console.log("File written successfully\n");
          console.log("The written has the following contents:");
          console.log(fs.readFileSync("abc.json", "utf8"));
        }
      });
      return data1;
    });
    // console.log(mainData.title);
    res.send("<h2 style='margin:0.7rem'>Posted Data Successfully</h2><br/><a style='text-decoration:none;margin:0.7rem' href='https://movieflix3112.netlify.app'>Go back</a>");
  }
});
const port = process.env.PORT || 9002;
app.listen(port, () => {
  console.log("App listening on the port 9002");
});

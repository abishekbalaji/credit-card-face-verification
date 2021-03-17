const path = require("path");
const spawn = require("child_process").spawn;
const fs = require("fs");

const express = require("express");
const bodyParser = require("body-parser");
const hbs = require("hbs");
const session = require("express-session");
const multer = require("multer");

require("./db/mongoose");

const CreditCardDetails = require("./db/models/creditCardDetails");

const app = express();

app.use(
  session({
    secret: "credit card app",
    resave: false,
    saveUninitialized: false,
  })
);

const port = process.env.PORT || 4000;

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");

const sourceImageStoragePath = path.join(
  __dirname,
  "../source-image/source.png"
);

app.use(express.static(publicDirectoryPath));
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "hbs");
app.set("views", viewsPath);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get("/", (req, res) => {
  res.render("front_page");
});

app.get("/checkout", (req, res) => {
  res.render("checkout_page");
});

app.post("/card-data", async (req, res) => {
  const requestDetails = req.body;
  console.log(requestDetails);
  const securityCode = Number(requestDetails.securityCode);
  console.log(securityCode);
  const details = await CreditCardDetails.findOne({
    ...requestDetails,
    securityCode,
  });

  console.log(details);
  if (details) {
    fs.writeFileSync(sourceImageStoragePath, details.photo);
    res.render("checkout_page_with_btn");
  } else {
    console.log("Invalid details!");
    res.render("checkout_page_wrong_cred");
  }
});

app.get("/take-photo", async (req, res) => {
  const pythonFilePath = path.join(
    __dirname,
    "../face_detection/opencv/data/haarcascades/test.py"
  );
  try {
    await spawn("python", [pythonFilePath]);
    // photoProcess.stdout.on("data", async (data) => {
    //   let dataArray = JSON.stringify(data.toString());
    //   console.log(dataArray);
    // });
    // photoProcess.stderr.pipe(process.stderr);
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log("Server started on port: " + port);
});

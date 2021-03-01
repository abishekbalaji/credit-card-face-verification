const mongoose = require("mongoose");

const url = "mongodb://127.0.0.1:27017/credit-card";

mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

console.log("Connected to the Database");

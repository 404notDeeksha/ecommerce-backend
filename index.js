const express = require("express");
require("dotenv").config();
const dbConnection = require("./config/dbConnection");
const bodyParser = require("body-parser");
// console.log("Hey", process.env.PORT, process.env.AMAZON_CONNECTION_STRING);

dbConnection();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 8001;

app.listen(port, () => {
  console.log(`Port is Connected at ${port}`);
});

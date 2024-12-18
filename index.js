const express = require("express");
require("dotenv").config();
const dbConnection = require("./config/DbConnection");
const bodyParser = require("body-parser");
const router = require("./routes/dataRoutes");
// console.log("Hey", process.env.PORT, process.env.AMAZON_CONNECTION_STRING);

dbConnection();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", router);

const port = process.env.PORT || 8001;

app.listen(port, () => {
  console.log(`Port is Connected at ${port}`);
});

const express = require("express");
require("dotenv").config();
const dbConnection = require("./config/DbConnection");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./routes/index.routes");
// const mongoose = require("mongoose");
dbConnection();
console.log("DIRECTORY_NAME", __dirname);

try {
  const dbConnection = require("./config/DbConnection");
  console.log("DbConnection module loaded successfully");
} catch (err) {
  console.error("Failed to load DbConnection:", err);
}

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:4173",
      process.env.FRONTEND_URL,
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use("/api", router);

const port = process.env.PORT || 8001;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

module.exports = app;

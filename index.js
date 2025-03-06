const express = require("express");
require("dotenv").config();
const dbConnection = require("./config/dbConnection");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./routes/index.routes");
// console.log("DIRECTORY_NAME", __dirname);
console.log("🟢 Server is starting...");
// console.log("Current Working Directory:", process.cwd());

dbConnection();

// console.log("Expected DbConnection path:");

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
app.get("/api/test", (req, res) => {
  console.log("🔵 /api/test route hit!");
  res.json({ message: "API is working!" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.use("/api", router);

// const port = process.env.PORT || 8001;

// app.listen(port, () => {
//   console.log(`Server is running at http://localhost:${port}`);
// });

module.exports = app;

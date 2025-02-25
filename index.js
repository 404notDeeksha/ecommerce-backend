const express = require("express");
require("dotenv").config();
const dbConnection = require("./config/DbConnection");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./routes/index.routes");
dbConnection();

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
app.use("/api", router);

const port = process.env.PORT || 8001;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

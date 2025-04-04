const express = require("express");
require("dotenv").config();
const dbConnection = require("./config/dbConnection");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./routes/index.routes");
const env = require("./config/envValidator");

dbConnection();

const app = express();

const allowedOrigins = [env.FRONTEND_URL, env.DEV_FRONTEND_URL];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS policy: This origin is not allowed"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, //
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.get("/api/test", (req, res) => {
  console.log("🔵 /api/test route hit!");
  res.json({ message: "API is working!" });
});

app.use("/api", router);

const port = env.PORT;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

module.exports = app;

const express = require("express");
require("dotenv").config();
const dbConnection = require("./config/DbConnection");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./routes/index.routes");
// const ProductRouter = require("./routes/Product.routes");
dbConnection();

const app = express();
``;
// Enable CORS middleware before all routes
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend origin
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Body parser middleware for JSON and URL encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api", router);

// Example API endpoint
// app.get("/api", (req, res) => {
//   res.json({ message: "Hello from backend!" });
// });

const port = process.env.PORT || 8001;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

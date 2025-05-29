require("dotenv").config();
const app = require("./app");
const env = require("./config/envValidator");
const dbConnection = require("./config/dbConnection");

const port = env.PORT || 3000;

dbConnection();

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

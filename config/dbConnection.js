const mongoose = require("mongoose");
const env = require("../config/envValidator");

const dbConnection = async () => {
  console.log("🟡 Trying to connect to MongoDB...");
  try {
    await mongoose.connect(env.MONGODB_URL);
    console.log("MongoDB connection successful!");
  } catch (err) {
    console.log("MongoDB connection failed:", err);
  }
};

module.exports = dbConnection;

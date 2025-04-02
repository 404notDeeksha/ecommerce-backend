require("dotenv").config(); // Load env variables from .env file

const requiredEnvVars = [
  "PORT",
  "FRONTEND_URL",
  "DEV_FRONTEND_URL",
  "AMAZON_CONNECTION_STRING",
  "JWT_ACCESS_KEY",
  "JWT_REFRESH_KEY",
];

const missingVars = requiredEnvVars.filter((key) => !process.env[key]);

if (missingVars.length > 0) {
  console.error(`🚨 Missing environment variables: ${missingVars.join(", ")}`);
  process.exit(1); // Stop the server if critical env variables are missing
}

console.log("✅ All required environment variables are set.");

module.exports = {
  PORT: process.env.PORT || 8001, // Default to 5000 if not set
  FRONTEND_URL: process.env.FRONTEND_URL,
  DEV_FRONTEND_URL: process.env.DEV_FRONTEND_URL,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
};

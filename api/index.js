const serverless = require("serverless-http");
const app = require("../index"); // Adjust the path if needed

module.exports.handler = serverless(app);

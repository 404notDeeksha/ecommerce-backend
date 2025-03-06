const serverless = require("serverless-http");
const app = require("../index");
console.log("Inside Serverless functions");
module.exports = serverless(app);

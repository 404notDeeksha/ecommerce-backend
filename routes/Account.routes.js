const express = require("express");
const {
  createAccount,
  handleGetUser,
  checkAccount,
  handleGetUserCredentials,
} = require("../controllers/Account.controller");

const accountRouter = express.Router();

accountRouter.route("/create").post(createAccount);
accountRouter.route("/check").post(checkAccount);
accountRouter.route("/signin").post(handleGetUser);
accountRouter.route("/signin/auth").get(handleGetUserCredentials);
// accountRouter.route("/products").get(handleGetP)
module.exports = accountRouter;

// different Routes wrto Usage

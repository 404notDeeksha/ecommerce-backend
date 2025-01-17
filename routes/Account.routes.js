const express = require("express");
const {
  createAccount,
  authController,
  checkEmail,
  // handleGetUserCredentials,
} = require("../controllers/Account.controller");

const accountRouter = express.Router();

accountRouter.route("/create").post(createAccount);
accountRouter.route("/check").post(checkEmail);
accountRouter.route("/auth").post(authController);
// accountRouter.route("/signin/auth").get(handleGetUserCredentials);
// accountRouter.route("/products").get(handleGetP)
module.exports = accountRouter;

// different Routes wrto Usage

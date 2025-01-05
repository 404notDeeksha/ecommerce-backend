const express = require("express");
const {
  handleCreateUser,
  handleGetUser,
  handleGetUserPresentAlready,
  handleGetUserCredentials,
} = require("../controllers/Account.controller");

const accountRouter = express.Router();

accountRouter.route("/").post(handleCreateUser);
accountRouter.route("/create").post(handleGetUserPresentAlready);
accountRouter.route("/signin").post(handleGetUser);
accountRouter.route("/signin/auth").get(handleGetUserCredentials);
// accountRouter.route("/products").get(handleGetP)
module.exports = accountRouter;

// different Routes wrto Usage

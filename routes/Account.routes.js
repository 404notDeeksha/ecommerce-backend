const express = require("express");
const {
  signupUser,
  loginUser,
  verifyEmail,
} = require("../controllers/Account.controller");

const userRouter = express.Router();

userRouter.route("/signup").post(signupUser);
userRouter.route("/emailAuth").post(verifyEmail);
userRouter.route("/login").post(loginUser);
module.exports = userRouter;

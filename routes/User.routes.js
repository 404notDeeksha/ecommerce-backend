const express = require("express");
const userRouter = express.Router();

const {
  signupUser,
  verifyPassword,
  verifyEmail,
  logoutUser,
} = require("../controllers/User.controller");

userRouter.route("/signup").post(signupUser);
userRouter.route("/emailAuth").post(verifyEmail);
userRouter.route("/passwordAuth").post(verifyPassword);
userRouter.route("/logout").post(logoutUser);
module.exports = userRouter;

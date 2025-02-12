const express = require("express");
const {
  signupUser,
  verifyPassword,
  verifyEmail,
  logoutUser,
  refreshToken,
} = require("../controllers/User.controller");

const userRouter = express.Router();

userRouter.route("/signup").post(signupUser);
userRouter.route("/emailAuth").post(verifyEmail);
userRouter.route("/passwordAuth").post(verifyPassword);
userRouter.route("/logout").post(logoutUser);
userRouter.route("/refresh").get(refreshToken);
module.exports = userRouter;

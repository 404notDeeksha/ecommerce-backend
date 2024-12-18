const express = require("express");
const {
  handleCreateUser,
  handleGetUser,
  handleGetUserPresentAlready,
  handleGetUserCredentials,
} = require("../controllers/DataController");

const router = express.Router();

router.route("/").post(handleCreateUser);
router.route("/create").post(handleGetUserPresentAlready);
router.route("/signin").get(handleGetUser);
router.route("/signin/auth").get(handleGetUserCredentials);

module.exports = router;

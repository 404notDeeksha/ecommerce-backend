// routes/categoryRoutes.js
const express = require("express");
const { getCategories } = require("../controllers/Category.controller");
const router = express.Router();

// Define the route for getting categories
router.get("/", getCategories);

module.exports = router;

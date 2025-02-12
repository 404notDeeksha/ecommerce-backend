// routes/categoryRoutes.js
const express = require("express");
const { getCarousel } = require("../controllers/Carousel.controller");
const router = express.Router();

// Define the route for getting categories
router.get("/featured", getCarousel);

module.exports = router;

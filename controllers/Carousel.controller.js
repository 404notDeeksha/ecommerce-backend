// controllers/carouselController.js
const Carousel = require("../models/Carousel.model");

//  /api/carousel/featured
const getCarousel = async (req, res) => {
  try {
    const carousel = await Carousel.find(); // Retrieves all carousel from MongoDB
    res.json({ success: true, data: carousel }); // Sends carousel as a JSON response
  } catch (err) {
    res.status(500).json({ success: false, message: err.message }); // Sends an error if something goes wrong
  }
};

module.exports = { getCarousel };

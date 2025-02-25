const Carousel = require("../models/Carousel.model");

//  /api/carousel/featured
const getCarousel = async (req, res) => {
  try {
    const carousel = await Carousel.find(); 
    res.json({ success: true, data: carousel }); 
  } catch (err) {
    res.status(500).json({ success: false, message: err.message }); 
  }
};

module.exports = { getCarousel };

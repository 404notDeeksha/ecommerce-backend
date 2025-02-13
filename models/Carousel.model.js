// models/category.js
const mongoose = require("mongoose");

const carouselSchema = new mongoose.Schema(
  {
    category_id: {
      type: String,
      required: true,
      unique: true,
    },
    display_type: {
      type: String,
      required: true,
    },
    category_image_address: {
      type: String,
      required: true,
    },
  }
  // { collection: "category_grid" } // Mongoose will now look for the category_collection collection in MongoDB.
);

const Carousel = mongoose.model("Carousel", carouselSchema);
module.exports = Carousel;

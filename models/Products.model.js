const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    ProductId: {
      type: String,
      required: true,
      unique: true,
    },
    ProductName: {
      type: String,
      required: true,
    },
    ProductDescription: {
      type: String,
      required: true,
    },
    Category: {
      type: String,
      required: true,
    },
    Price: {
      type: Number,
      required: true,
    },
    Brand: {
      type: String,
      required: true,
    },
    ModelName: {
      type: String,
      required: true,
    },
    Colour: {
      type: String,
      required: true,
    },
    ItemDimensions: {
      type: String, // Stored as "L x W x H" format
      required: true,
    },
    Images: {
      type: [String], // Array of image URLs
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

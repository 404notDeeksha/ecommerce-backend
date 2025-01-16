// const mongoose = require("mongoose");

// const productSchema = new mongoose.Schema(
//   {
//     ProductId: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     ProductName: {
//       type: String,
//       required: true,
//     },
//     ProductDescription: {
//       type: String,
//       required: true,
//     },

//     Category: {
//       type: String,
//       required: true,
//     },
//     Price: {
//       type: Number,
//       required: true,
//     },
//     Brand: {
//       type: String,
//       required: true,
//     },
//     ModelName: {
//       type: String,
//       required: true,
//     },
//     Colour: {
//       type: String,
//       required: true,
//     },
//     ItemDimensions: {
//       type: String, // Stored as "L x W x H" format
//       required: true,
//     },
//     Images: {
//       type: [String], // Array of image URLs
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// const Product = mongoose.model("Product", productSchema);

// module.exports = Product;

const mongoose = require("mongoose");

// Sub-schema for individual items
const itemSchema = new mongoose.Schema({
  itemId: { type: String, required: true, unique: true }, // Ensuring unique item IDs
  colour: { type: String, required: true },
  size: { type: String, default: null },
  price: { type: Number, required: true },
  stockAvailability: { type: Boolean, required: true },
});

// Main schema for the product
const productSchema = new mongoose.Schema({
  productId: { type: String, required: true, unique: true }, // Unique ID for each product
  productName: { type: String, required: true },
  productDescription: { type: String, required: true, maxlength: 100 }, // Description under 100 characters
  price: { type: Number, required: true },
  brand: { type: String, required: true },
  modelName: { type: String, required: true },
  colour: { type: String, required: true },
  itemDimensions: { type: String, required: true },
  images: [{ type: String, required: true }], // Array of image URLs
  weight: { type: String, required: true },
  material: { type: String, required: true },
  warranty: { type: String, required: true }, // Keeping warranty as required with no default value
  stockAvailability: { type: Boolean, required: true },
  rating: { type: Number, required: true }, // Keeping rating as required with no range restriction
  aboutThisItem: [{ type: String, required: true }], // Array of strings for details
  discount: { type: Number, required: true }, // Discount in percentage
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  bestseller: { type: Boolean, required: true },
  items: [itemSchema], // Embed itemSchema for the items array
});

// create index
productSchema.index({
  productName: "text",
  productDescription: "text",
  brand: "text",
  category: "text",
  subCategory: "text",
});

// Create the model
const Product = mongoose.model("Product", productSchema);

module.exports = Product;

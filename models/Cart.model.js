const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
    min: 1,
  },
  color: {
    type: String,
    required: false, // Optional if not all products have a color variant
  },
  size: {
    type: String,
    required: false, // Optional if products have size variants
  },
  image: {
    type: String,
    required: false, // URL for the product image
  },
});

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [cartItemSchema], // Array of cart items
  totalPrice: {
    type: Number,
    required: true,
    default: 0, // Calculate dynamically
  },
  totalQty: {
    type: Number,
    required: true,
    default: 0, // Calculate dynamically
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Cart", cartSchema);

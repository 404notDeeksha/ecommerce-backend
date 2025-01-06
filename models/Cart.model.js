const mongoose = require("mongoose");

// Define the schema for cart items
const cartItemSchema = new mongoose.Schema({
  ProductId: {
    type: String, // Matches the ProductId in the Product model
    required: true,
  },
  ProductName: {
    type: String, // Matches the ProductName in the Product model
    required: true,
  },
  ProductDescription: {
    type: String, // Matches the ProductDescription in the Product model
  },
  Category: {
    type: String, // Matches the Category in the Product model
  },
  Price: {
    type: Number, // Matches the Price in the Product model
    required: true,
  },
  Brand: {
    type: String, // Matches the Brand in the Product model
  },
  ModelName: {
    type: String, // Matches the ModelName in the Product model
  },
  Colour: {
    type: String, // Matches the Colour in the Product model
  },
  ItemDimensions: {
    type: String, // Matches the ItemDimensions in the Product model
  },
  Images: {
    type: [String], // Matches the Images in the Product model
  },
  quantity: {
    type: Number, // Quantity of this product in the cart
    required: true,
    min: 1,
  },
});

// Define the schema for the cart
const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the User model
      ref: "User",
      required: true,
    },
    items: [cartItemSchema], // Array of cart items
    totalPrice: {
      type: Number, // Total price of all items in the cart
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

// Calculate the total price before saving the cart
cartSchema.pre("save", function (next) {
  this.totalPrice = this.items.reduce(
    (total, item) => total + item.quantity * item.Price,
    0
  );
  next();
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;

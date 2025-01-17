const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

// Define the schema for cart items
const cartItemSchema = new mongoose.Schema({
  productId: {
    type: String, // Matches the ProductId in the Product model
    required: true,
  },
  productName: {
    type: String, // Matches the ProductName in the Product model
    required: true,
  },
  productDescription: {
    type: String, // Matches the ProductDescription in the Product model
  },
  // category: {
  //   type: String, // Matches the Category in the Product model
  // },
  price: {
    type: Number, // Matches the Price in the Product model
    required: true,
  },
  brand: {
    type: String, // Matches the Brand in the Product model
  },
  // modelName: {
  //   type: String, // Matches the ModelName in the Product model
  // },
  colour: {
    type: String, // Matches the Colour in the Product model
  },
  // itemDimensions: {
  //   type: String, // Matches the ItemDimensions in the Product model
  // },
  images: {
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
      type: String,
      default: uuidv4, // Automatically generate a unique UUID
      unique: true, // Ensure uniqueness in the database
      index: true, // Index this field for faster queries
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
    (total, item) => total + item.quantity * item.price,
    0
  );
  console.log("Total price", this.totalPrice);
  next();
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;

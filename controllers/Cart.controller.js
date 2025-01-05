const Cart = require("../models/Cart.model");

// Add an item to the cart
const addToCart = async (req, res) => {
  try {
    const { userId, productId, name, price, qty, color, size, image } =
      req.body;

    // Find the user's cart or create a new one
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] }); 
    }

    // Check if the item already exists in the cart
    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (existingItem) {
      // Update the quantity if the item exists
      existingItem.qty += qty;
    } else {
      // Add a new item to the cart
      cart.items.push({ productId, name, price, qty, color, size, image });
    }

    // Recalculate total price and quantity
    cart.totalPrice = cart.items.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );
    cart.totalQty = cart.items.reduce((sum, item) => sum + item.qty, 0);

    await cart.save();
    res.status(200).json({ success: true, cart });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to add item to cart", error });
  }
};

// Get the user's cart
const getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId }).populate("items.productId"); // Populate product details if needed

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    res.status(200).json({ success: true, cart });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch cart", error });
  }
};

// Update an item in the cart
const updateCartItem = async (req, res) => {
  try {
    const { userId, productId, qty } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    const item = cart.items.find(
      (item) => item.productId.toString() === productId
    );
    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found in cart" });
    }

    // Update the quantity
    item.qty = qty;

    // Remove the item if quantity is 0
    if (item.qty <= 0) {
      cart.items = cart.items.filter(
        (item) => item.productId.toString() !== productId
      );
    }

    // Recalculate total price and quantity
    cart.totalPrice = cart.items.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );
    cart.totalQty = cart.items.reduce((sum, item) => sum + item.qty, 0);

    await cart.save();
    res.status(200).json({ success: true, cart });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update item in cart",
      error,
    });
  }
};

// Clear the cart
const clearCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    cart.items = [];
    cart.totalPrice = 0;
    cart.totalQty = 0;

    await cart.save();
    res
      .status(200)
      .json({ success: true, message: "Cart cleared successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to clear cart", error });
  }
};

module.exports = {
  addToCart,
  getCart,
  updateCartItem,
  clearCart,
};

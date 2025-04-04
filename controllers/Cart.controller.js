const Cart = require("../models/Cart.model");

// POST/api/cart
const addCartItems = async (req, res) => {
  const { userId, items } = req.body;
  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items });
    } else {
      items.forEach((newItem) => {
        const index = cart.items.findIndex(
          (item) => item.productId === newItem.productId
        );

        if (index === -1) {
          cart.items.push(newItem);
        } else {
          cart.items[index].quantity =
            newItem.quantity || cart.items[index].quantity;
        }
      });
    }

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Items added to cart successfully",
      data: cart,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error adding items to cart", error });
  }
};

//  PUT/api/cart
const updateCartQty = async (req, res) => {
  const { userId, productId, quantity } = req.params;

  if (!userId || !productId || quantity === undefined) {
    return res.status(400).json({
      error: "Missing required fields: userId, productId, or quantity.",
    });
  }

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found for the user." });
    }

    const cartItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (!cartItem) {
      return res.status(404).json({ error: "Product not found in the cart." });
    }

    if (quantity !== 0) {
      cartItem.quantity = quantity;
    }

    await cart.save();
    res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      data: cart,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error updating cart items", error });
  }
};

//   /api/cart/:userId
const getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }
    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching cart", data: error });
  }
};

// GET /api/cart/quantity/:userId
const getCartQty = async (req, res) => {
  try {
    const { userId } = req.params; // Get user ID from authentication middleware

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    const totalQuantity =
      cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;

    res.status(200).json({ success: true, data: totalQuantity });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching cart quantity", data: error });
  }
};

//   DELETE/api/cart/:productId
const deleteCartItem = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    cart.items = cart.items.filter((item) => item.productId !== productId);

    await cart.save();
    res.status(200).json({
      success: true,
      message: "Item removed from cart",
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error removing item from cart",
      data: error,
    });
  }
};

module.exports = {
  addCartItems,
  updateCartQty,
  getCart,
  getCartQty,
  deleteCartItem,
};

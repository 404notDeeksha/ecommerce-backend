const Cart = require("../models/Cart.model");

// ADD TO CART
// POST/api/cart
const addCartItems = async (req, res) => {
  const { userId, items } = req.body;
  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      // Create a new cart if it doesn't exist
      cart = new Cart({ userId, items });
    } else {
      // Add new items (new Product id) to the cart
      // if you already have the productId in cart, update the qty from user
      items.forEach((newItem) => {
        const index = cart.items.findIndex(
          (item) => item.productId === newItem.productId
        );
        // console.log("Index of item found (item alraedy exists at) ", index);
        // console.log(`cart exists of user ${userId} and adding item`);
        if (index === -1) {
          // Add the new item to the cart
          cart.items.push(newItem);
        } else {
          cart.items[index].quantity =
            newItem.quantity || cart.items[index].quantity;
          // console.log(
          //   "NEW QTY UPDATED",
          //   cart.items[index].quantity,
          //   newItem.quantity,
          //   cart.items[index].quantity
          // );
        }
      });
    }
    // console.log("PRESENT CART", cart);
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

// Update Cart Item
//  PUT/api/cart
const updateCartQty = async (req, res) => {
  const { userId, productId, quantity } = req.params;
  console.log("Params of PUT request", req.params);

  if (!userId || !productId || quantity === undefined) {
    return res.status(400).json({
      error: "Missing required fields: userId, productId, or quantity.",
    });
  }

  try {
    // Find the cart for the user
    const cart = await Cart.findOne({ userId });
    // console.log("CART FOUND", cart);
    if (!cart) {
      return res.status(404).json({ error: "Cart not found for the user." });
    }

    // Find the product in the cart
    const cartItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (!cartItem) {
      return res.status(404).json({ error: "Product not found in the cart." });
    }

    if (quantity !== 0) {
      cartItem.quantity = quantity;
    }

    // Save the updated cart to the database
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

// Get Cart for a Specific User
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
    console.log("CART", cart);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching cart", data: error });
  }
};

//   Delete an Item from the Cart
//   DELETE/api/cart/:productId
const deleteCartItem = async (req, res) => {
  // console.log("Params:", req.params);
  const { userId, productId } = req.params;
  // console.log("DELETE cart", userId, productId);

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
  deleteCartItem,
};

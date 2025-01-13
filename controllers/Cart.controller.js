const Cart = require("../models/Cart.model");

// ADD TO CART
// /api/cart
const addCartItems = async (req, res) => {
  const { userId, items } = req.body;
  // console.log("ADD TO CART", items);
  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      // Create a new cart if it doesn't exist
      cart = new Cart({ userId, items });
    } else {
      // Add new items (new Product id) to the cart
      items.forEach((newItem) => {
        const index = cart.items.findIndex(
          (item) => item.ProductId === newItem.ProductId
        );
        console.log(`cart exists and adding ite`);
        if (index === -1) {
          // Add the new item to the cart
          cart.items.push(newItem);
        } else {
          // add 1 to qty
          // cart.item
        }
      });
    }
    console.log(cart);
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
//  /api/cart
const updateCartItems = async (req, res) => {
  const { userId, items } = req.body; // Extract userId and items from the request body

  try {
    // Find the cart for the given userId
    const cart = await Cart.findOne({ userId });
    console.log(userId, items, cart);
    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found for the user" });
    }

    // Loop through the items to update their quantities or other properties
    items.forEach((newItem) => {
      const index = cart.items.findIndex(
        (item) => item.ProductId === newItem.ProductId // Match item by ProductId
      );

      if (index !== -1) {
        // Update the existing item's quantity or other fields
        cart.items[index].quantity =
          newItem.quantity || cart.items[index].quantity;
        cart.items[index].color = newItem.color || cart.items[index].color;
        cart.items[index].seller = newItem.seller || cart.items[index].seller;
        cart.items[index].price = newItem.price || cart.items[index].price;
      }
    });

    // Save the updated cart to the database
    await cart.save();
    res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      data: cart.items,
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
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching cart", data: error });
  }
};

//   Delete an Item from the Cart
//   /api/cart/:productId
const deleteCartItem = async (req, res) => {
  console.log("Params:", req.params);
  console.log("Body:", req.body);
  const { userId, productId } = req.params;
  console.log("DELETE cart", userId, productId);

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    cart.items = cart.items.filter((item) => item.ProductId !== productId);

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
  updateCartItems,
  getCart,
  deleteCartItem,
};

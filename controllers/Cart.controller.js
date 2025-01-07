const Cart = require("../models/Cart.model");

//   /api/cart
// Add or Update Items in Cart
// const addOrUpdateCart = async (req, res) => {
//   const { userId, items } = req.body;

//   try {
//     let cart = await Cart.findOne({ userId });
//     console.log(cart);
//     if (!cart) {
//       // Create a new cart if it doesn't exist
//       cart = new Cart({ userId, items });
//     } else {
//       // Update existing cart items
//       items.forEach((newItem) => {
//         const index = cart.items.findIndex(
//           (item) => item.ProductId === newItem.ProductId
//         );

//         if (index === -1) {
//           // Add new item to the cart
//           cart.items.push(newItem);
//         } else {
//           // Update quantity of the existing item
//           cart.items[index].quantity += newItem.quantity;
//         }
//       });
//     }

//     await cart.save();
//     res
//       .status(200)
//       .json({ success: true, message: "Cart updated successfully", cart });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ success: false, message: "Error updating cart", error });
//   }
// };

// ADD TO CART
// /api/cart
const addCartItems = async (req, res) => {
  const { userId, items } = req.body;

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

        if (index === -1) {
          // Add the new item to the cart
          cart.items.push(newItem);
        }
      });
    }

    await cart.save();
    res.status(200).json({
      success: true,
      message: "Items added to cart successfully",
      cart,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error adding items to cart", error });
  }
};

// Update Cart Item
//  /api/cart/update
const updateCartItems = async (req, res) => {
  const { userId, items } = req.body; // Extract userId and items from the request body
  console.log(userId, items);
  try {
    // Find the cart for the given userId
    const cart = await Cart.findOne({ userId });

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
    res
      .status(200)
      .json({ success: true, message: "Cart updated successfully", cart });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error updating cart items", error });
  }
};

// Get Cart for a Specific User
const getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error });
  }
};

// // Delete an Item from the Cart
// const deleteCartItem = async (req, res) => {
//   const { userId, productId } = req.body;

//   try {
//     const cart = await Cart.findOne({ userId });

//     if (!cart) {
//       return res.status(404).json({ message: "Cart not found" });
//     }

//     cart.items = cart.items.filter((item) => item.ProductId !== productId);

//     await cart.save();
//     res.status(200).json({ message: "Item removed from cart", cart });
//   } catch (error) {
//     res.status(500).json({ message: "Error removing item from cart", error });
//   }
// };

// Clear the Entire Cart
const clearCart = async (req, res) => {
  const { userId } = req.body;

  try {
    const cart = await Cart.findOneAndDelete({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error clearing cart", error });
  }
};

module.exports = {
  addCartItems,
  updateCartItems,
  getCart,
  // deleteCartItem,
  clearCart,
};

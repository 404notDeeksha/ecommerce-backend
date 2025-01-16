const express = require("express");
const cartController = require("../controllers/Cart.controller");
const router = express.Router();

// Add an item to the cart
router.post("/", cartController.addCartItems);

// Get the user's cart
router.get("/:userId", cartController.getCart);

// Update an item in the cart - qty, color , brand update
router.put("/:userId/:productId/:quantity", cartController.updateCartQty);

// deletion is  wrto product id
router.delete("/:userId/:productId", cartController.deleteCartItem);

module.exports = router;

const express = require("express");
const cartController = require("../controllers/Cart.controller");
const router = express.Router();

// Add an item to the cart
router.post("/", cartController.addOrUpdateCart);

// Get the user's cart
router.get("/:userId", cartController.getCart);

// Update an item in the cart
router.put("/", cartController.addOrUpdateCart);

// Clear the user's cart
router.delete("/:userId", cartController.clearCart);

module.exports = router;

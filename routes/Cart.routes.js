const express = require("express");
const cartController = require("../controllers/Cart.controller");
const router = express.Router();

router.post("/", cartController.addCartItems);
router.get("/:userId", cartController.getCart);
router.get("/quantity/:userId", cartController.getCartQty);
router.put("/:userId/:productId/:quantity", cartController.updateCartQty);
router.delete("/:userId/:productId", cartController.deleteCartItem);

module.exports = router;

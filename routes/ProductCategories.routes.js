const express = require("express");
const {
  getCategoryByCategoryId,
  getProductByCategoryAndProductId,
} = require("../controllers/ProductCategories.controllers"); // Adjust the path

const router = express.Router();

// Route to get a category by category_id
router.get("/:category_id", getCategoryByCategoryId);

// Route to get a product by category_id and product_id
router.get(
  "/:category_id/products/:product_id",
  getProductByCategoryAndProductId
);

module.exports = router;

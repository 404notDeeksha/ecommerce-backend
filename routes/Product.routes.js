const { Router } = require("express");
const Products = require("../controllers/Products.controller");
const router = Router();

// router("/product",et(handleGetProduct);
router.get("/", Products.getAllProducts);
router.get("/product/:id", Products.getSingleProduct);
// router.get("")

module.exports = router;

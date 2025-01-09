const { Router } = require("express");
const Products = require("../controllers/Products.controller");
const router = Router();

// router("/product",get(handleGetProduct);
router.get("/:id", Products.getAllProducts);
router.get("/product/:id", Products.getSingleProduct);
// router.get("")

module.exports = router;

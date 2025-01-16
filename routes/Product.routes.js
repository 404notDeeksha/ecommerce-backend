const { Router } = require("express");
const Products = require("../controllers/Products.controller");
const router = Router();

//  /api/products
router.get("/", Products.getAllProducts);
router.get("/product/:id", Products.getSingleProduct);
// router.get("/search", Products.searchProduct);
module.exports = router;

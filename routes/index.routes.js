const userRouter = require("./Account.routes");
const ProductRouter = require("./Product.routes");
const CartRouter = require("./Cart.routes");
const CategoryRouter = require("./Category.routes");
const ProductCategories = require("./ProductCategories.routes");

const express = require("express");
const router = express.Router();

router.use("/user", userRouter);
//
router.use("/products", ProductRouter);
router.use("/cart", CartRouter);
router.use("/category", CategoryRouter);
router.use("/categories", ProductCategories);

module.exports = router;

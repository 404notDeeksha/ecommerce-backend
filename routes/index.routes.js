const userRouter = require("./User.routes");
const ProductRouter = require("./Product.routes");
const CartRouter = require("./Cart.routes");
const CarouselRouter = require("./Carousel.routes");
const ProductCategories = require("./ProductCategories.routes");
const express = require("express");
const authMiddleware = require("../middleware/auth");
const router = express.Router();

router.use("/user", userRouter);
router.use("/carousel", authMiddleware, CarouselRouter);
router.use("/categories", authMiddleware, ProductCategories);
router.use("/products", authMiddleware, ProductRouter);
router.use("/cart", authMiddleware, CartRouter);

module.exports = router;

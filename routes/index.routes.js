const express = require("express");
const authMiddleware = require("../middleware/auth");
const router = express.Router();

const userRouter = require("./User.routes");
const ProductRouter = require("./Products.routes");
const CartRouter = require("./Cart.routes");
const CarouselRouter = require("./Carousel.routes");

router.use("/user", userRouter);
router.use("/carousel", authMiddleware, CarouselRouter);
router.use("/products", authMiddleware, ProductRouter);
router.use("/cart", authMiddleware, CartRouter);

module.exports = router;

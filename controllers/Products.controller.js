const Products = require("../models/Products.model");
const createHttpError = require("http-errors");

// /api/products
const getAllProducts = async (req, res, next) => {
  try {
    const post = await Products.find();
    if (!post)
      throw createHttpError.NotFound({ message: "Products Not Found!" });
    res.send(post);
  } catch (error) {
    next(error);
  }
};

//   /api/products/:filter
const getFilteredProducts = async (req, res, next) => {
  const { filter } = req.params;
  console.log("Filters", filter);
  try {
    const post = await Products.find({ Category: filter });
    console.log("Post", post);
    if (!post || post.length === 0) {
      throw createHttpError.NotFound("Products Not Found!");
    }
    res.send(post);
  } catch (error) {
    next(error);
  }
};

//  /api/products/product/:id
const getSingleProduct = async (req, res, next) => {
  console.log("hey3");
  try {
    const post = await Products.findOne({ ProductId: req.params.id });
    console.log("Post found", post);
    if (!post)
      throw createHttpError.NotFound({ message: "Product Not Found!" });
    res.send(post);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllProducts, getFilteredProducts, getSingleProduct };

const Products = require("../models/Products.model");
const createHttpError = require("http-errors");

const getAllProducts = async (req, res, next) => {
  const { id } = req.params.id;
  try {
    const post = await Products.find({ category_id: id });
    if (!post)
      throw createHttpError.NotFound({ message: "Products Not Found!" });
    res.send(post);
  } catch (error) {
    next(error);
  }
};

const getSingleProduct = async (req, res, next) => {
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

module.exports = { getAllProducts, getSingleProduct };

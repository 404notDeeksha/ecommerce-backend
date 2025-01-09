const Products = require("../models/Products.model");
const createHttpError = require("http-errors");

//   /api/products/:filter
const getAllProducts = async (req, res, next) => {
  try {
    // Extract filters dynamically from query parameters
    const filters = req.query;
    // Build the dynamic query
    const query = {};

    if (filters.category) {
      query.Category = filters.category;
    }

    if (filters.minPrice || filters.maxPrice) {
      query.Price = {
        ...(filters.minPrice && { $gte: parseFloat(filters.minPrice) }),
        ...(filters.maxPrice && { $lte: parseFloat(filters.maxPrice) }),
      };
    }

    if (filters.brand) {
      query.Brand = { $in: filters.brand.split(",") }; // Support multiple brands
    }

    console.log(query);
    // Fetch filtered products from database
    const products = await Products.find(query);

    if (!products || products.length === 0) {
      return next(createHttpError.NotFound("Products Not Found!"));
    }

    res.status(200).json({
      success: true,
      data: products,
    });
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

module.exports = { getAllProducts, getSingleProduct };

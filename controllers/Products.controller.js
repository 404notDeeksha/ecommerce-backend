const Products = require("../models/Products.model");

//   GET /api/products?filter
const getAllProducts = async (req, res, next) => {
  try {
    const filters = req.query;

    const query = {};

    if (filters.category) {
      query.category = filters.category;
    }

    if (filters.subCategory) {
      query.subCategory = filters.subCategory;
    }

    if (filters.discount) {
      query.discount = {
        ...{ $gte: 0 },
        ...{ $lte: filters.discount },
      };
    }

    if (filters.minPrice || filters.maxPrice) {
      query.Price = {
        ...(filters.minPrice && { $gte: parseFloat(filters.minPrice) }),
        ...(filters.maxPrice && { $lte: parseFloat(filters.maxPrice) }),
      };
    }

    if (filters.brand) {
      query.brand = { $in: filters.brand.split(",") };
    }

    const products = await Products.find(query);

    console.log("products", products.length);
    if (!products || products.length === 0) {
      return res.status(200).json({
        success: false,
        message: "No products found matching the filters.",
        data: [],
      });
    }
    res.send({ success: true, data: products });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

//  GET /api/products/product/:id
const getSingleProduct = async (req, res, next) => {
  console.log("hey3", req.params.id);
  try {
    const product = await Products.findOne({ productId: req.params.id });
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product Not Found!" });
    res.send({ success: true, data: product });
  } catch (error) {
    console.log("Error fetching Product", error);
  }
};

module.exports = {
  getAllProducts,
  getSingleProduct,
};

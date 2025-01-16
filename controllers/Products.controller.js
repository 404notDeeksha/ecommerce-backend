const Products = require("../models/Products.model");
const createHttpError = require("http-errors");

//   /api/products/
const getAllProducts = async (req, res, next) => {
  console.log("CALLING ALL PRODUCTS");
  try {
    // Extract filters dynamically from query parameters
    const filters = req.query;
    console.log("Filters", filters);
    // Build the dynamic query
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
      query.brand = { $in: filters.brand.split(",") }; // Support multiple brands
    }

    console.log("query", query);
    // Fetch filtered products from database
    const products = await Products.find(query);
    // console.log("PRODUCT", products);

    if (!products || products.length === 0) {
      return next(createHttpError.NotFound("Products Not Found!"));
    }
    res.send({ success: true, data: products });
  } catch (error) {
    next(error);
  }
};

//  /api/products/product/:id
const getSingleProduct = async (req, res, next) => {
  console.log("hey3", req.params.id);
  try {
    const product = await Products.findOne({ productId: req.params.id });
    console.log("product found", product);
    if (!product)
      throw createHttpError.NotFound({ message: "Product Not Found!" });
    res.send({ success: true, data: product });
  } catch (error) {
    console.log("Error fetching Product", error);
  }
};

// const searchProduct = async (req, res, next) => {
//   const searchText = req.query.q;
//   console.log(searchText);
//   try {
//     const results = await Products.find({ $text: { $search: searchText } });
//     if (!results)
//       throw createHttpError.NotFound({ message: "Product Not Found!" });
//     res.send({ success: true, data: results });
//   } catch (error) {
//     console.log("Error fetching Product", error);
//   }
// };

module.exports = {
  getAllProducts,
  getSingleProduct,
  // searchProduct
};

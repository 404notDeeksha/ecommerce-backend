const Categories = require("../models/ProductCategories.model");

//   /api/categories/category_id
const getCategoryByCategoryId = async (req, res) => {
  try {
    const { category_id } = req.params;
    console.log(category_id);
    // Find category by category_id
    const category = await Categories.find({ category_id });
    console.log(category);
    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.status(200).json({
      message: "Category fetched successfully!",
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching category",
      error: error.message,
    });
  }
};

const getProductByCategoryAndProductId = async (req, res) => {
  try {
    const { category_id, product_id } = req.params;

    // Find category by category_id
    const category = await Categories.findOne({ category_id });

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    // Find the product in the category's products array
    const product = category.products.find(
      (prod) => prod.product_id === parseInt(product_id)
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found in this category",
      });
    }

    res.status(200).json({
      message: "Product fetched successfully!",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching product",
      error: error.message,
    });
  }
};

module.exports = { getCategoryByCategoryId, getProductByCategoryAndProductId };

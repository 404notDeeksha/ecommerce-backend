// controllers/categoryController.js
const Category = require("../models/Category.model");

// Controller to fetch categories from the database
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find(); // Retrieves all categories from MongoDB
    res.json(categories); // Sends categories as a JSON response
  } catch (err) {
    res.status(500).json({ message: err.message }); // Sends an error if something goes wrong
  }
};

module.exports = { getCategories };


const mongoose = require('mongoose');

// Define the details schema
const DetailsSchema = new mongoose.Schema({
    Brand: { type: String, required: true },
    "Item Weight": { type: String, required: true },
    "Item dimensions L x W x H": { type: String, required: true },
    Scent: { type: String, required: false },
    "Age Range (Description)": { type: String, required: true },
    "Skin Type": { type: String, required: true },
    "Item Package Quantity": { type: Number, required: true },
    "Product Benefits": { type: String, required: true },
    "Special Feature": { type: String, required: false },
    "Active Ingredients": { type: String, required: false },
});

// Define the product schema
const ProductSchema = new mongoose.Schema({
    product_id: { type: Number, required: true },
    product_heading: { type: String, required: true },
    product_category: { type: String, required: true },
    data: {
        rating: { type: Number, required: true },
        selling_price: { type: Number, required: true },
        discount_percentage: { type: Number, required: true, max: 10 },
        deliveryType: { type: String, enum: ["free", "paid"], required: true },
        brandname: { type: String, required: true },
    },
    features: [{ type: String }],
    details: { type: DetailsSchema, required: true },
});

// Define the main category schema
const CategorySchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    category_id: { type: String, required: true },
    category_name: { type: String, required: true },
    products: [ProductSchema],
});

// Create models
const Categories = mongoose.model('Category', CategorySchema);

module.exports = Categories;

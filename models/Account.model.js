const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const accountSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      default: uuidv4, // Automatically generate a unique ID
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      // match: [/.+@.+\..+/, 'Please enter a valid email address'], // Basic email validation
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // Ensure secure password length
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("Account", accountSchema);

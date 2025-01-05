const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    visitHistory: [],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Account", accountSchema);

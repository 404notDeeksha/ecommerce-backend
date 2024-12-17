const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: false,
    },
    visitHistory: [],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("DataSchema", dataSchema);

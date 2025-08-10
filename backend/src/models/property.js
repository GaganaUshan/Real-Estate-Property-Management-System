const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  address: { type: String, required: true },
  price: { type: Number, required: true },
  status: { type: String, enum: ["available", "rented"], default: "available" },
}, { timestamps: true });

module.exports = mongoose.model("Property", propertySchema);

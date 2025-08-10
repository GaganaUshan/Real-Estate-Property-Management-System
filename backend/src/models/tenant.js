const mongoose = require("mongoose");

const tenantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  property: { type: mongoose.Schema.Types.ObjectId, ref: "Property" }
}, { timestamps: true });

module.exports = mongoose.model("Tenant", tenantSchema);

const mongoose = require("mongoose");

const maintenanceSchema = new mongoose.Schema({
  description: { type: String, required: true },
  status: { type: String, enum: ["pending", "in progress", "completed"], default: "pending" },
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant" }
}, { timestamps: true });

module.exports = mongoose.model("Maintenance", maintenanceSchema);

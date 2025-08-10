const express = require("express");
const Property = require("../models/property");
const router = express.Router();

// Create
router.post("/", async (req, res) => {
  try {
    const property = await Property.create(req.body);
    res.status(201).json(property);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Read All
router.get("/", async (req, res) => {
  const properties = await Property.find();
  res.json(properties);
});

// Update
router.put("/:id", async (req, res) => {
  const property = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(property);
});

// Delete
router.delete("/:id", async (req, res) => {
  await Property.findByIdAndDelete(req.params.id);
  res.json({ message: "Property deleted" });
});

module.exports = router;

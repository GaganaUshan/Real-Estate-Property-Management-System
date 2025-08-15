const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(express.json());

// Enable CORS for frontend
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// Dummy in-memory properties store
let properties = [];

// GET all properties
app.get("/api/properties", (req, res) => {
  res.json(properties);
});

// POST a new property
app.post("/api/properties", (req, res) => {
  const { name, location, price } = req.body;
  if (!name || !location || !price) {
    return res.status(400).json({ message: "All fields required" });
  }

  const newProperty = {
    _id: Date.now().toString(),
    name,
    location,
    price
  };

  properties.push(newProperty);
  res.status(201).json(newProperty);
});

// DELETE a property by ID
app.delete("/api/properties/:id", (req, res) => {
  const { id } = req.params;
  console.log("Deleting ID:", id); // Debug log
  const index = properties.findIndex((p) => p._id === id);

  if (index === -1) return res.status(404).json({ message: "Property not found" });

  properties.splice(index, 1);
  res.json({ message: "Property deleted" });
});

// Error handler
app.use((err, req, res, next) => {
  const statusCode = res.statusCode || 500;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

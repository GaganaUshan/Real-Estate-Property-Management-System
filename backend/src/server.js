const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./route/authRoutes");
const contactRoutes = require("./route/contactRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactRoutes);

// Error handler middleware (optional)
app.use((err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

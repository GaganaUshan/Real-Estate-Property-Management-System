const express = require("express");
const {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/")
  .get(protect, getContacts)
  .post(protect, createContact);

router.route("/:id")
  .put(protect, updateContact)
  .delete(protect, deleteContact);

module.exports = router;

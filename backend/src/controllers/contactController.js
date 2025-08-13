const asyncHandler = require("express-async-handler");
const Contact = require("../models/Contact");

// @desc    Get all contacts for logged-in user
// @route   GET /api/contacts
// @access  Private
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user: req.user.id });
  res.json(contacts);
});

// @desc    Create new contact
// @route   POST /api/contacts
// @access  Private
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone, type } = req.body;

  if (!name) {
    res.status(400);
    throw new Error("Name is required");
  }

  const contact = await Contact.create({
    name,
    email,
    phone,
    type,
    user: req.user.id,
  });

  res.status(201).json(contact);
});

// @desc    Update contact
// @route   PUT /api/contacts/:id
// @access  Private
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updatedContact);
});

// @desc    Delete contact
// @route   DELETE /api/contacts/:id
// @access  Private
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  await Contact.findByIdAndDelete(req.params.id);

  res.json({ message: "Contact removed" });
});

module.exports = { getContacts, createContact, updateContact, deleteContact };

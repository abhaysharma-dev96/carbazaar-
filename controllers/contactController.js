import Contact from "../models/Contact.js";

// @desc  Submit contact form
// @route POST /api/contact
export const createContact = async (req, res, next) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json({ success: true, message: "Message sent successfully", data: contact });
  } catch (error) {
    next(error);
  }
};

// @desc  Get all contact messages (admin use)
// @route GET /api/contact
export const getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, count: contacts.length, data: contacts });
  } catch (error) {
    next(error);
  }
};
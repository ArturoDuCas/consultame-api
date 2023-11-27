const express = require("express");
const router = express.Router();
const ContactsControllers = require("../controllers/contacts")

router.get("/:id", ContactsControllers.getUserContacts);
router.post("/", ContactsControllers.createContact);
router.delete("/:id", ContactsControllers.deleteContact);

module.exports = router;
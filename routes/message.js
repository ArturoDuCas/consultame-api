const express = require("express");
const router = express.Router();
const MessageController = require("../controllers/message");

router.get("/:id", MessageController.getMessages);
router.post("/", MessageController.createMessage);

module.exports = router;

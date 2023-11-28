const express = require("express");
const router = express.Router();
const MessageController = require("../controllers/message");

router.post("/", MessageController.createMessage);

router.get("/:consultation_id", MessageController.getMessages);

module.exports = router;

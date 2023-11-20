const express = require("express");
const router = express.Router();
const MessageController = require("../controllers/message");

router.post("/", MessageController.createMessage);

module.exports = router;

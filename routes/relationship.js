const express = require("express");
const router = express.Router();
const RelationshipControllers = require("../controllers/relationship")

router.get("/", RelationshipControllers.getAllRelationships);

module.exports = router;
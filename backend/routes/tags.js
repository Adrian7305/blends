const express = require("express");
const router = express.Router();
const { getTags } = require("../controllers/tagsController");

// GET /api/tags
router.get("/", getTags);

module.exports = router;


const express = require("express");
const router = express.Router();
const { validateCollege } = require("../controllers/validateController");

router.post("/", validateCollege);

module.exports = router;

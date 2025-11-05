const express = require("express");
const router = express.Router();
const qrController = require("../controllers/qrController");
const auth = require("../middleware/auth");

// POST /api/attendance/checkin
router.post("/checkin", auth, qrController.checkin);

module.exports = router;

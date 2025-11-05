// routes/attendance.js
const express = require("express");
const { checkin } = require("../controllers/qrController.js");

const router = express.Router();

// ✅ QR-based check-in using Registration model
router.post("/checkin", checkin);

module.exports = router;

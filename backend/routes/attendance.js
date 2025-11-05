// routes/attendance.js
const express = require("express");
const { verifyQRandMarkAttendance } = require("../controllers/attendanceController.js");

const router = express.Router();

// ✅ POST route to verify QR & mark attendance
router.post("/verify", verifyQRandMarkAttendance);

module.exports = router;

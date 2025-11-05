const express = require("express");
const router = express.Router();
const { signup, login, getProfile } = require("../controllers/authController");
const authMiddleware = require("../middleware/auth");

// Public Routes
router.post("/signup", signup);
router.post("/login", login);

// Protected Routes
router.get("/profile", authMiddleware, getProfile);

module.exports = router;

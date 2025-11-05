const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authMiddleware = require("../middleware/auth");

/**
 * @route   GET /account/profile
 * @desc    Get logged-in user’s profile
 * @access  Private (JWT required)
 */
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    // The user ID is available in req.user from authMiddleware
    const user = await User.findById(req.user.id).select("-password"); // exclude password
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      message: "Profile fetched successfully",
      user,
    });
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ message: "Server error while fetching profile" });
  }
});

/**
 * @route   POST /account/delete
 * @desc    Delete account by email (JWT required)
 * @access  Private
 */
router.post("/delete", authMiddleware, async (req, res) => {
  try {
    const { email } = req.body;

    if (!email)
      return res.status(400).json({ message: "Email is required" });

    // Double-check the user trying to delete matches their own email
    if (email !== req.user.email)
      return res.status(403).json({ message: "Unauthorized request" });

    const deletedUser = await User.findOneAndDelete({ email });

    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (err) {
    console.error("Error deleting account:", err);
    res.status(500).json({ message: "Server error while deleting account" });
  }
});

module.exports = router;

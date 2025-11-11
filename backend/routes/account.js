const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Registration = require("../models/registration");
const Event = require("../models/event");
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

/**
 * @route   GET /account/registrations
 * @desc    Get user's event registrations (tickets)
 * @access  Private (JWT required)
 */
router.get("/registrations", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Find all registrations for the user and populate event details
    const registrations = await Registration.find({ user: userId })
      .populate('event', 'eventTitle eventType startDate endDate location bannerImage organizedBy')
      .sort({ createdAt: -1 });

    if (!registrations || registrations.length === 0) {
      return res.status(200).json({
        message: "No registrations found",
        registrations: []
      });
    }

    // Format the response to match frontend expectations
    const formattedRegistrations = registrations.map(registration => ({
      _id: registration._id,
      ticketId: registration.orderId,
      qrCode: registration.qrCode,
      qr_code: registration.qrCode, // Alternative field name for compatibility
      event: {
        _id: registration.event._id,
        eventTitle: registration.event.eventTitle,
        name: registration.event.eventTitle, // Alternative field name for compatibility
        eventType: registration.event.eventType,
        startDate: registration.event.startDate,
        date: registration.event.startDate, // Alternative field name for compatibility
        endDate: registration.event.endDate,
        location: registration.event.location,
        venue: registration.event.location, // Alternative field name for compatibility
        bannerImage: registration.event.bannerImage,
        image: registration.event.bannerImage, // Alternative field name for compatibility
        organizedBy: registration.event.organizedBy,
        college: registration.event.organizedBy // Alternative field name for compatibility
      },
      createdAt: registration.createdAt,
      checkedIn: registration.checkedIn
    }));

    res.status(200).json({
      message: "Registrations fetched successfully",
      registrations: formattedRegistrations
    });
  } catch (err) {
    console.error("Error fetching user registrations:", err);
    res.status(500).json({ message: "Server error while fetching registrations" });
  }
});

module.exports = router;

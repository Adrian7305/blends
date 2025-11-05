// routes/events.js
const express = require("express");
const {
  createEvent,
  getEvents, // Changed from getAllEvents
  getEventById,
  registerForEvent,
  verifyPayment,
  updateEvent, // New import
  deleteEvent, // New import
} = require("../controllers/eventController.js");

const router = express.Router();

// 🆕 CRUD Routes
router.post("/create", createEvent);
router.get("/", getEvents);
router.get("/:id", getEventById);

// 🆕 Update and Delete routes
router.put("/:id", updateEvent); // Update event details
router.delete("/:id", deleteEvent); // Delete event

// 💳 Razorpay + Registration Routes
router.post("/:id/register", registerForEvent);
router.post("/:id/verify-payment", verifyPayment);

module.exports = router;
// routes/events.js
const express = require("express");
const {
  createEvent,
  getEvents, // Changed from getAllEvents
  getEventById,
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

// 💳 Payment & registration are handled via /api/payments

module.exports = router;

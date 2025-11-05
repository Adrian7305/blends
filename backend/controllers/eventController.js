// controllers/eventController.js
const Event = require("../models/event.js");
const Registration = require("../models/registration.js");

// Payments are handled via paymentController using Registration model

// ✅ Create new Event
const createEvent = async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json({ message: "Event created successfully", event });
  } catch (error) {
    res.status(500).json({ message: "Error creating event", error: error.message });
  }
};

module.exports = {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent
};

// ✅ Get events with filters + pagination
const getEvents = async (req, res) => {
  try {
    const { type, q, from, to, tags, page = 1, limit = 20 } = req.query;
    const query = {};
    if (type) query.eventType = type;
    if (q) query.$or = [
      { eventTitle: { $regex: q, $options: "i" } },
      { description: { $regex: q, $options: "i" } }
    ];
    if (from || to) {
      query.startDate = {};
      if (from) query.startDate.$gte = new Date(from);
      if (to) query.startDate.$lte = new Date(to);
    }
    if (tags) {
      const tagsArray = Array.isArray(tags) ? tags : String(tags).split(",").map(t => t.trim()).filter(Boolean);
      if (tagsArray.length) query.tags = { $in: tagsArray };
    }

    const skip = (Number(page) - 1) * Number(limit);
    const [items, total] = await Promise.all([
      Event.find(query).sort({ startDate: 1 }).skip(skip).limit(Number(limit)),
      Event.countDocuments(query)
    ]);

    res.status(200).json({ total, page: Number(page), limit: Number(limit), items });
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error: error.message });
  }
};

// ✅ Get event by ID with user-context and registration stats
const getEventById = async (req, res) => {
  try {
    const eventId = req.params.id;
    const { userId } = req.query; // optional

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    const [registeredCount, checkedInCount] = await Promise.all([
      Registration.countDocuments({ event: eventId }),
      Registration.countDocuments({ event: eventId, checkedIn: true })
    ]);

    let isRegistered = false;
    let isTeamMember = false;
    if (userId) {
      const reg = await Registration.findOne({ event: eventId, user: userId }).select("_id");
      isRegistered = !!reg;
      const Team = require("../models/team.js");
      const team = await Team.findOne({ eventId, $or: [
        { leaderId: userId },
        { "members.userId": userId }
      ] }).select("_id");
      isTeamMember = !!team;
    }

    res.status(200).json({
      event,
      context: { registeredCount, checkedInCount, isRegistered, isTeamMember }
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching event", error: error.message });
  }
};

// Deprecated: event-based payment and registration handled in paymentController

// ✅ Update Event
const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const event = await Event.findByIdAndUpdate(id, updates, { new: true });
    if (!event) return res.status(404).json({ message: "Event not found" });

    res.status(200).json({
      message: "Event updated successfully",
      event,
    });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ message: "Server error while updating event" });
  }
};

// ✅ Delete Event
const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findByIdAndDelete(id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    res.status(200).json({
      message: "Event deleted successfully",
      deletedEvent: event,
    });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ message: "Server error while deleting event" });
  }
};

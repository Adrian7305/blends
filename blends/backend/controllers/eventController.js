const Event = require("../models/event");
const Registration = require("../models/registration");

exports.createEvent = async (req, res, next) => {
  try {
    // protect with auth and admin role if needed (check req.user.role)
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (err) { next(err); }
};

exports.getEvents = async (req, res, next) => {
  try {
    const events = await Event.find().sort({ startDate: 1 });
    res.json(events);
  } catch (err) { next(err); }
};

exports.getEventById = async (req, res, next) => {
  try {
    const ev = await Event.findById(req.params.id).populate("teams").populate("registeredUsers");
    if (!ev) return res.status(404).json({ message: "Event not found" });
    res.json(ev);
  } catch (err) { next(err); }
};

// registration route should redirect to payment flow; you will create frontend + call createOrder then verify
exports.registerForEvent = async (req, res, next) => {
  try {
    res.json({ message: "This endpoint should trigger frontend to create order" });
  } catch (err) { next(err); }
};

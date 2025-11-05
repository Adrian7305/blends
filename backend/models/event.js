// models/event.js
const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  eventTitle: { type: String, required: true },
  eventType: { type: String, required: true },
  description: { type: String },
  tags: [{ type: String }],
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  location: { type: String, required: true },
  registrationFee: { type: Number, required: true },
  participants: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      paymentStatus: { type: String, enum: ["pending", "paid"], default: "pending" },
      qrCode: { type: String },
      attendance: { type: Boolean, default: false },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Event", eventSchema);

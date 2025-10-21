const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: { type: String, required: true },
  type: String,
  startDate: Date,
  endDate: Date,
  location: String,
  description: String,
  price: { type: Number, default: 0 },
  approval: { type: Boolean, default: false },
  registeredUsers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  teams: [{ type: Schema.Types.ObjectId, ref: "Team" }]
}, { timestamps: true });

module.exports = mongoose.model("Event", eventSchema);

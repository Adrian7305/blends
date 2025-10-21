const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teamSchema = new Schema({
  event: { type: Schema.Types.ObjectId, ref: "Event", required: true },
  leader: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  score: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("Team", teamSchema);

const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  email: { type: String, required: true },
  code: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  used: { type: Boolean, default: false },
  collegeId: { type: mongoose.Schema.Types.ObjectId, ref: "College" }
});

module.exports = mongoose.model("Otp", otpSchema);

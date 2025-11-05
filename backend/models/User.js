const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: String,
  collegeVerified: { type: Boolean, default: false },
  collegeName: { type: String, default: null },
  // (optional) keep otp fields only if you store OTP in user too
  otp: { type: String, default: null },
  otpExpires: { type: Date, default: null },
}, { timestamps: true });


module.exports = mongoose.model("User", userSchema);

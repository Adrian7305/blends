const Otp = require("../models/Otp");
const College = require("../models/College");
const User = require("../models/User");
const generateOtp = require("../utils/generateOtp");
const sendEmail = require("../utils/sendEmail");

exports.sendOtp = async (req, res) => {
  try {
    const { email, userId } = req.body;
    const domain = email.split("@")[1].toLowerCase();

    // Match college domain
    const college = await College.findOne({ college_mail: new RegExp(domain, "i") });
    if (!college) return res.status(400).json({ message: "No college found for domain" });

    const otpCode = generateOtp();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await Otp.create({
      userId,
      email,
      code: otpCode,
      expiresAt,
      collegeId: college._id
    });

    const html = `
      <p>Hello,</p>
      <p>Your OTP for college verification is <b>${otpCode}</b></p>
      <p>This OTP is linked to <b>${college.college_name}</b></p>
      <p>It expires in <b>5 minutes</b>.</p>
    `;

    await sendEmail(email, "College Verification OTP", html);

    return res.status(200).json({ message: "OTP sent successfully", college });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error while sending OTP" });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp, userId } = req.body;
    const record = await Otp.findOne({ email, code: otp, used: false });

    if (!record) return res.status(400).json({ message: "Invalid OTP" });
    if (record.expiresAt < new Date()) return res.status(400).json({ message: "OTP expired" });

    record.used = true;
    await record.save();

    const college = await College.findById(record.collegeId);

    await User.findByIdAndUpdate(userId, {
  collegeVerified: true,
  collegeName: college.college_name,
  otp: null,
  otpExpires: null
}, { new: true });


    res.status(200).json({ message: "OTP verified successfully", college });
  } catch (error) {
    res.status(500).json({ error: "Error verifying OTP" });
  }
};

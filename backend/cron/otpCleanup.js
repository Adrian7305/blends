const cron = require("node-cron");
const Otp = require("../models/Otp");

const otpCleanupJob = cron.schedule("*/10 * * * *", async () => {
  try {
    await Otp.deleteMany({ expiresAt: { $lt: new Date() } });
    console.log("🧹 Cleaned up expired OTPs");
  } catch (error) {
    console.error("Error cleaning OTPs:", error);
  }
});

module.exports = otpCleanupJob;

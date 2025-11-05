require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const errorHandler = require("./middlewares/errorHandler");
const otpCleanupJob = require("./cron/otpCleanup");

// 🧩 Import routes
const authRoutes = require("./routes/authRoutes");
const validateRoutes = require("./routes/validate");
const otpRoutes = require("./routes/otp"); // combined send + verify OTP
const accountRoutes = require("./routes/account");

const app = express();

// 🧩 Middleware
app.use(cors());
app.use(bodyParser.json());

// 🧩 MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// 🧩 Routes
app.use("/auth", authRoutes);         // Signup + Login
app.use("/validate", validateRoutes); // College email validation
app.use("/otp", otpRoutes);           // Send + Verify OTP
app.use("/account", accountRoutes);   // Account delete, profile, etc.

// 🧩 Root route
app.get("/", (req, res) => {
  res.send("🚀 Authentication & College Verification Backend Active!");
});

// 🕒 Start cron job – clean expired OTPs every 10 minutes
otpCleanupJob.start();

// 🧩 Global error handler (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
const otpCleanupJob = require("./cron/otpCleanup");

// 🧩 Import routes
const authRoutes = require("./routes/authRoutes");
const eventsRoutes = require("./routes/events");
const teamsRoutes = require("./routes/teams");
const attendanceRoutes = require("./routes/attendance");
const analyticsRoutes = require("./routes/analytics");
const paymentRoutes = require("./routes/payment");
const validateRoutes = require("./routes/validate");
const otpRoutes = require("./routes/otp");
const accountRoutes = require("./routes/account");

const app = express();

// 🧩 Middleware
app.use(cors());
app.use(express.json({ limit: "5mb" }));

// 🧩 MongoDB Connection
connectDB();

// 🧩 Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventsRoutes);
app.use("/api/teams", teamsRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/validate", validateRoutes);
app.use("/api/otp", otpRoutes);
app.use("/api/account", accountRoutes);

// 🧩 Root route
app.get("/", (req, res) => {
  res.send("🚀 Blends Backend is Active!");
});

// 🕒 Start cron job – clean expired OTPs every 10 minutes
otpCleanupJob.start();

// 🧩 Global error handler (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

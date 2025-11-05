require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

// connect db
connectDB();

const app = express();
app.use(cors());
app.use(express.json({ limit: "5mb" })); // allow base64 QR sizes

// Mount the routes (ensure filenames match your repo)
app.use("/api/auth", require("./routes/auth")); // senior dev provided
app.use("/api/events", require("./routes/events"));
app.use("/api/teams", require("./routes/teams"));
app.use("/api/payments", require("./routes/payments"));
app.use("/api/attendance", require("./routes/attendance"));
app.use("/api/analytics", require("./routes/analytics"));

app.get("/", (req, res) => res.send("Backend up - event/team/qr module"));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));

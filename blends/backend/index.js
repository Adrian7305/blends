// index.js

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables
dotenv.config();

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

// Basic test route
app.get("/", (req, res) => {
  res.send("Backend is up and running 🚀");
});

// ✅ Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://adrian:adrian7305@blends-data.ourbujo.mongodb.net/?retryWrites=true&w=majority&appName=blends-data";

mongoose
  .connect(MONGO_URI, { dbName: "blends_data" })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Server listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

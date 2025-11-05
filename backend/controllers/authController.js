const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// 🔐 JWT helper
const generateToken = (user) =>
  jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

// =======================
// SIGNUP
// =======================
exports.signup = async (req, res) => {
  try {
    let { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "Name, email, and password are required" });

    email = email.trim().toLowerCase();

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    // Align with your schema: collegeVerified/collegeName
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      collegeVerified: false,
      collegeName: null,
    });

    const token = generateToken(newUser);

    return res.status(201).json({
      message: "Signup successful",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        collegeVerified: newUser.collegeVerified,
        collegeName: newUser.collegeName,
      },
    });
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({ message: "Server error during signup" });
  }
};

// =======================
// LOGIN
// =======================
exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email and password are required" });

    email = email.trim().toLowerCase();

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken(user);

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        collegeVerified: user.collegeVerified || false,
        collegeName: user.collegeName || null,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Server error during login" });
  }
};

// =======================
// GET PROFILE (protected)
// =======================
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    // Ensure we always send the key fields the frontend expects
    return res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      collegeVerified: user.collegeVerified || false,
      collegeName: user.collegeName || null,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    console.error("Profile Fetch Error:", error);
    return res.status(500).json({ message: "Server error fetching profile" });
  }
};

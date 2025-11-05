const User = require("../models/User");

exports.deleteAccount = async (req, res) => {
  try {
    const { email } = req.body;
    await User.findOneAndDelete({ email });
    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting account" });
  }
};

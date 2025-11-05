const College = require("../models/College");

exports.validateCollege = async (req, res) => {
  try {
    const { email } = req.body;
    const domain = email.split("@")[1].toLowerCase();

    const college = await College.findOne({ college_mail: new RegExp(domain, "i") });

    if (!college) {
      return res.status(400).json({ valid: false, message: "Invalid college domain" });
    }

    res.status(200).json({ valid: true, college });
  } catch (error) {
    res.status(500).json({ error: "Server error validating college" });
  }
};

const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema({
  college_name: { type: String, required: true },
  college_mail: { type: String, required: true }, // e.g. "@dsu.edu.in"
  collegeLogoUrl: { type: String }
});

module.exports = mongoose.model("College", collegeSchema);

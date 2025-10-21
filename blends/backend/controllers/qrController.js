const Registration = require("../models/registration");

exports.checkin = async (req, res, next) => {
  try {
    const { qrData } = req.body; // frontend decodes QR and sends JSON string or registrationId
    // Try parse
    let registrationId = qrData;
    try {
      const parsed = JSON.parse(qrData);
      if (parsed.registrationId) registrationId = parsed.registrationId;
    } catch (e) { /* not JSON, assume plain id */ }

    const registration = await Registration.findById(registrationId);
    if (!registration) return res.status(404).json({ message: "Invalid QR / registration not found" });

    if (registration.checkedIn) return res.status(400).json({ message: "Already checked-in" });

    registration.checkedIn = true;
    await registration.save();

    res.json({ success: true, message: "Attendance marked", registration });
  } catch (err) {
    next(err);
  }
};

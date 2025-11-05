// controllers/attendanceController.js
import Event from "../models/event.js";
import QRCode from "qrcode";

export const verifyQRandMarkAttendance = async (req, res) => {
  try {
    const { qrData } = req.body;

    // QR data structure: "EventID: <id>, UserID: <id>, PaymentID: <id>"
    const parts = qrData.split(",");
    const eventId = parts[0].split(":")[1].trim();
    const userId = parts[1].split(":")[1].trim();

    // Find event
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Find participant
    const participant = event.participants.find(
      (p) => p.userId.toString() === userId
    );
    if (!participant)
      return res.status(404).json({ message: "Participant not registered for this event" });

    if (participant.attendance)
      return res.status(400).json({ message: "Attendance already marked" });

    // ✅ Mark attendance
    participant.attendance = true;
    await event.save();

    res.status(200).json({
      success: true,
      message: "Attendance marked successfully ✅",
      participant,
    });
  } catch (error) {
    res.status(500).json({ message: "Error verifying QR", error: error.message });
  }
};

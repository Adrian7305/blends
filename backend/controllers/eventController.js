// controllers/eventController.js
const Event = require("../models/event.js");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const QRCode = require("qrcode");
const nodemailer = require("nodemailer");

// 🟢 Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ✅ Create new Event
const createEvent = async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json({ message: "Event created successfully", event });
  } catch (error) {
    res.status(500).json({ message: "Error creating event", error: error.message });
  }
};

module.exports = {
  createEvent,
  getEvents,
  getEventById,
  registerForEvent,
  verifyPayment,
  updateEvent,
  deleteEvent
};

// ✅ Get all events (Renamed to getEvents for consistency with routes file)
const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error: error.message });
  }
};

// ✅ Get event by ID
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Error fetching event", error: error.message });
  }
};

// ✅ Register for event (Create Razorpay Order)
const registerForEvent = async (req, res) => {
  try {
    const { eventId, userId, amount } = req.body;

    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json({
      success: true,
      order_id: order.id,
      currency: order.currency,
      amount: order.amount,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating Razorpay order", error: error.message });
  }
};

// ✅ Verify payment and confirm registration
const verifyPayment = async (req, res) => {
  try {
    const { eventId, userId, razorpay_order_id, razorpay_payment_id, razorpay_signature, userEmail } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (expectedSign === razorpay_signature) {
      // Generate QR code for confirmation
      const qrData = `EventID: ${eventId}, UserID: ${userId}, PaymentID: ${razorpay_payment_id}`;
      const qrCode = await QRCode.toDataURL(qrData);

      // Store user registration info in DB
      const event = await Event.findById(eventId);
      event.participants.push({
        userId,
        paymentStatus: "paid",
        qrCode,
      });
      await event.save();

      // Send confirmation email with QR code
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: "Event Registration Successful 🎉",
        html: `
          <h2>Registration Confirmed!</h2>
          <p>You’ve successfully registered for the event.</p>
          <p><b>Event ID:</b> ${eventId}</p>
          <p><b>Payment ID:</b> ${razorpay_payment_id}</p>
          <p>Scan the below QR at the event to check-in:</p>
          <img src="${qrCode}" alt="QR Code" />
        `,
      };

      await transporter.sendMail(mailOptions);

      return res.status(200).json({
        success: true,
        message: "Payment verified and registration completed",
        qrCode,
      });
    } else {
      res.status(400).json({ success: false, message: "Invalid signature, payment verification failed" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error verifying payment", error: error.message });
  }
};

// ✅ Update Event
const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const event = await Event.findByIdAndUpdate(id, updates, { new: true });
    if (!event) return res.status(404).json({ message: "Event not found" });

    res.status(200).json({
      message: "Event updated successfully",
      event,
    });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ message: "Server error while updating event" });
  }
};

// ✅ Delete Event
const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findByIdAndDelete(id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    res.status(200).json({
      message: "Event deleted successfully",
      deletedEvent: event,
    });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ message: "Server error while deleting event" });
  }
};
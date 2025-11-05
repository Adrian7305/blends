const razorpay = require("../config/razorpay");
const crypto = require("crypto");
const Registration = require("../models/registration");
const generateQRCode = require("../utils/generateQRCode");
const sendEmail = require("../utils/sendEmail");
const User = require("../models/User");

exports.createOrder = async (req, res, next) => {
  try {
    const { amount } = req.body;
    if (!amount) return res.status(400).json({ message: "amount required" });

    const options = {
      amount: Number(amount) * 100,
      currency: "INR",
      receipt: `rcpt_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    next(err);
  }
};

exports.verifyPayment = async (req, res, next) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId, eventId } = req.body;
    const generated_signature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      return res.status(400).json({ verified: false, message: "Invalid signature" });
    }

    // Save registration
    const registration = await Registration.create({
      user: userId,
      event: eventId,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id
    });

    // Generate QR and save
    const qrPayload = JSON.stringify({ registrationId: registration._id.toString() });
    const qrDataUrl = await generateQRCode(qrPayload);
    registration.qrCode = qrDataUrl;
    await registration.save();

    // Optionally populate user email
    const user = await User.findById(userId);

    // Send confirmation email with QR (embedding base64)
    const html = `<p>Registration confirmed for event. Show this QR at check-in.</p><img src="${qrDataUrl}" />`;
    await sendEmail(user.email, "Event Registration Confirmed", html);

    res.json({ verified: true, registration });
  } catch (err) {
    next(err);
  }
};

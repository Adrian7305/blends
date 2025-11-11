const { StandardCheckoutClient, Env, StandardCheckoutPayRequest } = require("pg-sdk-node");
const { randomUUID } = require("crypto");
const Registration = require("../models/registration");
const generateQRCode = require("../utils/generateQRCode");
const sendEmail = require("../utils/sendEmail");
const User = require("../models/User");

// Initialize PhonePe Standard Checkout client
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const clientVersion = parseInt(process.env.CLIENT_VERSION, 10);
const env = (process.env.PHONEPE_ENV === "PRODUCTION") ? Env.PRODUCTION : Env.SANDBOX;

const phonePeClient = StandardCheckoutClient.getInstance(
  clientId,
  clientSecret,
  clientVersion,
  env
);

exports.createOrder = async (req, res, next) => {
  try {
    const { amount, userId, eventId } = req.body;
    if (!amount) return res.status(400).send("Amount is required");
    if (!userId || !eventId) return res.status(400).send("userId and eventId are required");

    const merchantOrderId = randomUUID();
    const baseUrl = process.env.BASE_URL || `http://localhost:${process.env.PORT || 5000}`;
    const redirectUrl = `${baseUrl}/api/payments/check-status?merchantOrderId=${merchantOrderId}&userId=${userId}&eventId=${eventId}`;

    const request = StandardCheckoutPayRequest.builder()
      .merchantOrderId(merchantOrderId)
      .amount(Number(amount))
      .redirectUrl(redirectUrl)
      .build();

    const response = await phonePeClient.pay(request);
    return res.json({ checkoutPageUrl: response.redirectUrl ,merchantOrderId});
  } catch (error) {
    console.error("Error creating PhonePe order", error);
    res.status(500).send("Error Creating Order");
  }
};

exports.checkStatus = async (req, res, next) => {
  try {
    const { merchantOrderId, userId, eventId } = req.query;
    if (!merchantOrderId) return res.status(400).send("Merchant Order Id is required");

    const response = await phonePeClient.getOrderStatus(merchantOrderId);
    const status = response.state;

    const frontendBase = process.env.FRONTEND_URL || "http://localhost:5173";

    if (status === "COMPLETED") {
      // If user and event context is present, create registration and send QR
      if (userId && eventId) {
        const registration = await Registration.create({
          user: userId,
          event: eventId,
          paymentId: merchantOrderId,
          orderId: merchantOrderId
        });

        const qrPayload = JSON.stringify({ registrationId: registration._id.toString() });
        const qrDataUrl = await generateQRCode(qrPayload);
        registration.qrCode = qrDataUrl;
        await registration.save();

        // Attempt to send email
        try {
          const user = await User.findById(userId);
          if (user && user.email) {
            const html = `<p>Registration confirmed for event. Show this QR at check-in.</p><img src="${qrDataUrl}" />`;
            await sendEmail(user.email, "Event Registration Confirmed", html);
          }
        } catch (e) {
          console.warn("Email sending failed", e);
        }
      }
      return res.redirect(`${frontendBase}/success`);
    } else {
      return res.redirect(`${frontendBase}/failure`);
    }
  } catch (error) {
    console.error("Error checking PhonePe status", error);
    res.status(500).send(`Error Checking Status: ${error?.message || error}`);
  }
};

// New: Return payment status as JSON for polling flows
exports.getStatus = async (req, res, next) => {
  try {
    const { merchantOrderId } = req.params;
    if (!merchantOrderId) return res.status(400).json({ message: "Merchant Order Id is required" });

    const response = await phonePeClient.getOrderStatus(merchantOrderId);
    return res.json({ state: response.state });
  } catch (error) {
    console.error("Error getting PhonePe order status", error);
    res.status(500).json({ message: `Error Getting Status: ${error?.message || error}` });
  }
};

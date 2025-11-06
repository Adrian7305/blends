const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

// POST /api/payments/create-order
router.post("/create-order", paymentController.createOrder);
// GET /api/payments/check-status
router.get("/check-status", paymentController.checkStatus);

module.exports = router;

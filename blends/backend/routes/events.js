const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const auth = require("../middleware/auth");

router.post("/create", auth, eventController.createEvent);
router.get("/", eventController.getEvents);
router.get("/:id", eventController.getEventById);

// /events/:id/register can be used to initiate registration flow (or call payments.create-order)
router.post("/:id/register", auth, eventController.registerForEvent);

module.exports = router;

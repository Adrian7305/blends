// routes/teams.js
const express = require("express");
const {
  createTeam,
  joinTeam,
  getTeamsForEvent,
} = require("../controllers/teamController.js");

const router = express.Router();

router.post("/create", createTeam);
router.post("/join", joinTeam);
router.get("/event/:eventId", getTeamsForEvent);

module.exports = router;

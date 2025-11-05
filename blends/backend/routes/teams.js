const express = require("express");
const router = express.Router();
const teamController = require("../controllers/teamController");
const auth = require("../middleware/auth");

router.post("/create", auth, teamController.createTeam);
router.post("/join", auth, teamController.joinTeam);
router.get("/event/:id", teamController.getTeamsByEvent);

module.exports = router;

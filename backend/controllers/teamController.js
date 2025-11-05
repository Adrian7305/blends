const Team = require("../models/team.js");
const Event = require("../models/event.js");

// ✅ Create a team
const createTeam = async (req, res) => {
  try {
    const { teamName, eventId, leaderId } = req.body;

    // Ensure event exists
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Create team
    const team = await Team.create({
      teamName,
      eventId,
      leaderId,
      members: [{ userId: leaderId }],
    });

    res.status(201).json({
      success: true,
      message: "Team created successfully 🎉",
      team,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating team", error: error.message });
  }
};

// ✅ Join a team
const joinTeam = async (req, res) => {
  try {
    const { teamId, userId } = req.body;

    const team = await Team.findById(teamId);
    if (!team) return res.status(404).json({ message: "Team not found" });

    // Prevent duplicate join
    const alreadyJoined = team.members.some(
      (member) => member.userId.toString() === userId
    );
    if (alreadyJoined)
      return res.status(400).json({ message: "User already in the team" });

    // Add member
    team.members.push({ userId });
    await team.save();

    res.status(200).json({
      success: true,
      message: "Joined team successfully 🤝",
      team,
    });
  } catch (error) {
    res.status(500).json({ message: "Error joining team", error: error.message });
  }
};

// ✅ Get all teams for a specific event
const getTeamsForEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const teams = await Team.find({ eventId }).populate("leaderId members.userId");

    res.status(200).json({
      success: true,
      count: teams.length,
      teams,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching teams", error: error.message });
  }
};

module.exports = {
  createTeam,
  joinTeam,
  getTeamsForEvent
};

const Team = require("../models/team");
const Event = require("../models/event");

exports.createTeam = async (req, res, next) => {
  try {
    const { name, eventId } = req.body;
    const leader = req.user && req.user.id;
    if (!leader) return res.status(401).json({ message: "Unauthorized" });

    const team = await Team.create({ name, event: eventId, leader, members: [leader] });
    await Event.findByIdAndUpdate(eventId, { $push: { teams: team._id } });
    res.status(201).json(team);
  } catch (err) { next(err); }
};

exports.joinTeam = async (req, res, next) => {
  try {
    const { teamId } = req.body;
    const userId = req.user && req.user.id;
    const team = await Team.findById(teamId);
    if (!team) return res.status(404).json({ message: "Team not found" });
    if (team.members.includes(userId)) return res.status(400).json({ message: "Already a member" });

    team.members.push(userId);
    await team.save();
    res.json(team);
  } catch (err) { next(err); }
};

exports.getTeamsByEvent = async (req, res, next) => {
  try {
    const teams = await Team.find({ event: req.params.id }).populate("members leader", "name email");
    res.json(teams);
  } catch (err) { next(err); }
};

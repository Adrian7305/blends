const Team = require("../models/team");

exports.getLeaderboard = async (req, res, next) => {
  try {
    const { eventId, limit } = req.query;
    const query = {};
    if (eventId) query.eventId = eventId;

    const teams = await Team.find(query)
      .sort({ score: -1 })
      .limit(Number(limit) || 0)
      .populate("eventId leaderId members.userId", "eventTitle name email");

    res.json(teams);
  } catch (err) {
    next(err);
  }
};

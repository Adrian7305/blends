const Team = require("../models/team");

exports.getLeaderboard = async (req, res, next) => {
  try {
    const teams = await Team.find().sort({ score: -1 }).populate("event leader members", "title name email");
    res.json(teams);
  } catch (err) { next(err); }
};

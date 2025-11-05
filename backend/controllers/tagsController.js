const Event = require("../models/event");

exports.getTags = async (req, res, next) => {
  try {
    const tags = await Event.distinct("tags");
    // Filter out empty values and sort
    const uniqueSorted = tags.filter(Boolean).sort((a, b) => a.localeCompare(b));
    res.json({ tags: uniqueSorted });
  } catch (err) {
    next(err);
  }
};


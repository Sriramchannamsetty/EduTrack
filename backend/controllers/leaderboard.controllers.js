const User = require("../models/User");

async function getLeaderboard(req, res) {
  try {
    const leaderboard = await User.aggregate([
      // Only students
      { $match: { role: "student" } },

      // Calculate totalPoints from courses array
      {
        $addFields: {
          totalPoints: { $sum: "$courses.points" }
        }
      },

      // Project only what you need
      {
        $project: {
          _id: 0,
          userId: "$_id",
          name: 1,
          username: 1,
          totalPoints: 1,
          profileImage: 1
        }
      },

      // Sort by totalPoints descending
      { $sort: { totalPoints: -1 } }
    ]);

    res.status(200).json(leaderboard);
  } catch (err) {
    console.error("Error generating leaderboard:", err);
    res.status(500).json({ error: err.message });
  }
}
module.exports = {getLeaderboard}

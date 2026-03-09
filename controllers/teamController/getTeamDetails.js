const teamModel = require("../../models/teamModel");
const sendResponse = require("../../helper/sendResponse");

async function getTeamDetails(req, res) {
  try {
    const { teamKey } = req.body;

    const team = await teamModel
      .findOne({ teamKey })
      .populate("members.userId", "name email");
    //   console.log("TEAM KEY RECEIVED:", teamKey);

    if (!team) {
      return sendResponse(res, 404, "failure", "Team not found");
    }

    return sendResponse(res, 200, "success", "Team fetched", team);
  } catch (err) {
    return sendResponse(res, 500, "failure", "Server error");
  }
}

module.exports = getTeamDetails;

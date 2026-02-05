const teamModel = require("../../models/teamModel");
const sendResponse = require("../../helper/sendResponse");
const logger = require("../../helper/logger");

// update team name
async function updateTeamName(req, res) {
  try {
    const userId = req.userId;
    const data = req.updateTeam;

    const team = await teamModel.findOne({
      teamName: data.teamName,
      adminUserId: userId,
    });
    team.teamName = data.newteamname;

    await team.save();
    // console.log(team);

    const newteam = {
      teamName: team?.teamName,
      teamDescription: team?.teamDescription,
      teamProfilePic: null,
      teamKey: team?.teamKey,
      role: team?.role,
      updatedAt: team?.updatedAt,
    };
    // console.log(newteam);

    return sendResponse(res, 200, "success", "team name updated", newteam);
  } catch (err) {
    logger.log({
      level: "info",
      message: "error in updateTeamNameController >>>>>",
      error: err.message,
    });
  }
}
module.exports = updateTeamName;

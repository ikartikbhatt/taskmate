const teamModel = require("../../models/teamModel");
const sendResponse = require("../../helper/sendResponse");
const logger = require("../../helper/logger");

// leave team

async function leaveTeamController(req, res) {
  try {
    const userId = req.userId;
    const { teamKey } = req.leaveTeam;

    await teamModel.updateOne(
      { teamKey: teamKey },
      {
        $pull: {
          members: { userId: userId },
        },
      }
    );

    return sendResponse(res, 200, "success", "Left team successfully");
  } catch (err) {
    logger.log({
      level: "info",
      message: "error in deleteTeamController >>>>>",
      error: err.message,
    });
  }
}

module.exports = leaveTeamController;

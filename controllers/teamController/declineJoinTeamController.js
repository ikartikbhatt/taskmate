const teamModel = require("../../models/teamModel");
const sendResponse = require("../../helper/sendResponse");
const logger = require("../../helper/logger");

// create team
async function declineJoinTeamController(req, res) {
  try {
    const userId = req.userId;
    const { teamKey, requestUserId } = req.declineJoinTeam;

    //remove from pending requestn
    await teamModel.findOneAndUpdate(
      { teamKey: teamKey },
      {
        $pull: {
          pendingRequests: { userId: requestUserId },
        },
      },
      { new: true }
    );
    return sendResponse(
      res,
      200,
      "success",
      "team Join request declined successfully"
    );
  } catch (err) {
    logger.log({
      level: "info",
      message: "error in declineJoinTeamController >>>>>",
      error: err.message,
    });
  }
}

module.exports = declineJoinTeamController;

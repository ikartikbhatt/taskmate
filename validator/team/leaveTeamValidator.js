const userModel = require("../../models/userModel");
const teamModel = require("../../models/teamModel");
const sendResponse = require("../../helper/sendResponse");
const logger = require("../../helper/logger");

// Leave team Validator
async function leaveTeamValidator(req, res, next) {
  try {
    const userId = req.userId;
    const teamKey = req.body?.teamKey;

    if (!teamKey) {
      return sendResponse(res, 400, "failure", "provide proper inputs");
    }

    const team = await teamModel.findOne({
      teamKey: teamKey,
    });

    if (!team) {
      return sendResponse(res, 400, "failure", "team not found");
    }

    const isMember = team.members.find((m) => m.userId == userId);

    if (!isMember) {
      return sendResponse(res, 400, "failure", "User not in team");
    }

    // EDGE CASE: admin cannot leave team
    if (team.adminUserId.toString() === userId) {
      return sendResponse(
        res,
        400,
        "failure",
        "admin must transfer admin rights before leaving"
      );
    }

    req.leaveTeam = team;

    next();
  } catch (error) {
    logger.log({
      level: "error",
      message: "error in updateTeamValidator >>>>>",
      error: error.message,
    });
  }
}

module.exports = leaveTeamValidator;

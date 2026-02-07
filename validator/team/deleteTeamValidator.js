const teamModel = require("../../models/teamModel");
const sendResponse = require("../../helper/sendResponse");
const logger = require("../../helper/logger");

// delete team validator
async function deleteTeamValidator(req, res, next) {
  try {
    const userId = req.userId;
    const teamKey = req.body?.teamKey;
    // const teamname = req.body?.teamName;
    if (!teamKey) {
      return sendResponse(res, 400, "failure", "provide proper inputs");
    }

    const team = await teamModel.findOne({
      teamKey: teamKey,
      adminUserId: userId,
    });
    if (!team) return sendResponse(res, 400, "failure", "team not found");

    req.deleteTeam = { teamKey: team.teamKey };
    console.log("BODY:", req.body);

    next();

  } catch (err) {
    logger.log({
      level: "info",
      message: "error in deleteTeamValidator >>>>>",
      error: err.message,
    });
  }

}

module.exports = deleteTeamValidator;

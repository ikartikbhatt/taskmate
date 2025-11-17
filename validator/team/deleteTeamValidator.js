const teamModel = require("../../models/teamModel");
const sendResponse = require("../../helper/sendResponse");
const logger = require("../../helper/logger");

// delete team validator
async function deleteTeamValidator(req, res, next) {
  try {
    // const teamkey = req.body?.teamkey;
    const userId = req.userId;
    const teamname = req.body?.teamname;
    if (!teamname) {
      return sendResponse(res, 400, "failure", "provide proper inputs");
    }

    const team = await teamModel.findOne({
      teamName: teamname,
      adminUserId: userId,
    });
    if (!team) return sendResponse(res, 400, "failure", "team not found");

    req.deleteTeam = { teamName: teamname, teamKey: team.teamKey };
  } catch (err) {
    logger.log({
      level: "info",
      message: "error in deleteTeamValidator >>>>>",
      error: err.message,
    });
  }

  next();
}

module.exports = deleteTeamValidator;

const sendResponse = require("../../helper/sendResponse");
const logger = require("../../helper/logger");
const config = require("../../config/config.json");
const teamModel = require("../../models/teamModel");
// search team
async function searchTeamValidator(req, res, next) {
  try {
    const teamKey = req.body?.teamKey;

    if (teamKey.length > 25) {
      return sendResponse(
        res,
        400,
        "failure",
        "teamkey length must be less than 25 characters"
      );
    }

    const teamKeyRegex = new RegExp(config.regex.teamKeyRegex);

    if (!teamKeyRegex.test(teamKey))
      return sendResponse(
        res,
        400,
        "failure",
        "please provide proper teamKey format"
      );

    const findTeamKey = await teamModel.findOne({ teamKey });

    if (!findTeamKey) {
      return sendResponse(res, 400, "failure", "team does not exists");
    }

    req.searchTeam = teamKey;

    next();
  } catch (err) {
    logger.log({
      level: "info",
      message: "error in searchTeamValidator >>>>>",
      error: err.message,
    });
  }
}

module.exports = searchTeamValidator;

const teamModel = require("../../models/teamModel");
const sendResponse = require("../../helper/sendResponse");
const logger = require("../../helper/logger");
const config = require("../../config/config.json");

// update team name validator
async function updateTeamNameValidator(req, res, next) {
  try {
    // const teamkey = req.body?.teamkey;
    const userId = req.userId;
    const teamname = req.body?.teamname;
    const newteamname = req.body?.newteamname;
    if (!teamname || !newteamname) {
      return sendResponse(res, 400, "failure", "provide proper inputs");
    }

    if (newteamname.length < 4 || newteamname.length > 25) {
      return sendResponse(
        res,
        400,
        "failure",
        "teamname length must be between 4 to 25 characters"
      );
    }
    const teamRegex = new RegExp(config.regex.teamNameRegex);

    if (!teamRegex.test(newteamname))
      return sendResponse(
        res,
        400,
        "failure",
        "Only _ and - are allowed as special characters"
      );

    if (teamname === newteamname)
      return sendResponse(
        res,
        400,
        "failure",
        "old name and new name can not be same"
      );

    const team = await teamModel.findOne({
      teamName: teamname,
      adminUserId: userId,
    });
    if (!team) return sendResponse(res, 400, "failure", "team not found");
    // console.log(team);

    const checkForDuplicateTeam = await teamModel.findOne({
      adminUserId: userId,
      teamName: newteamname,
    });

    if (checkForDuplicateTeam)
      return sendResponse(
        res,
        400,
        "failure",
        "found team with same name please use another team name"
      );

    req.updateTeam = {
      teamName: teamname,
      newteamname: newteamname,
      teamKey: team.teamKey,
    };
  } catch (err) {
    logger.log({
      level: "info",
      message: "error in updateTeamValidator >>>>>",
      error: err.message,
    });
  }

  next();
}

module.exports = updateTeamNameValidator;

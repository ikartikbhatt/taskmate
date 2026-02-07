const teamModel = require("../../models/teamModel");
const sendResponse = require("../../helper/sendResponse");
const logger = require("../../helper/logger");
const config = require("../../config/config.json");

// team name regex
const teamRegex = new RegExp(config.regex.teamNameRegex);

// update team name validator
async function updateTeamNameValidator(req, res, next) {
  try {
    const userId = req.userId;
    const teamKey = req.body?.teamKey;
    const newTeamDescription = req.body?.newTeamDescription;
    const newTeamName = req.body?.newTeamName;

    if (!userId) {
      return sendResponse(res, 401, "failure", "unauthorized");
    }

    if (!teamKey) {
      return sendResponse(res, 400, "failure", "teamKey is required");
    }

    // find team
    const team = await teamModel.findOne({
      teamKey,
      adminUserId: userId,
    });

    if (!team) {
      return sendResponse(res, 404, "failure", "team not found");
    }


    if (!newTeamName && !teamDescription) {
      return sendResponse(res, 400, "failure", "provide proper inputs");
    }
    if (newTeamName) {
      if (newTeamName.length < 4 || newTeamName.length > 25) {
        return sendResponse(
          res,
          400,
          "failure",
          "teamname length must be between 4 to 25 characters"
        );
      }
    }

    if (!teamRegex.test(newTeamName)) {
      return sendResponse(
        res,
        400,
        "failure",
        "Only _ and - are allowed as special characters"
      );
    }

    if (newTeamName == team.teamName) {
      return sendResponse(
        res,
        400,
        "failure",
        "old name and new name cannot be same"
      );
    }

    const duplicate = await teamModel.findOne({
      adminUserId: userId,
      teamName: newTeamName,
      teamKey: { $ne: teamKey },
    });

    if (duplicate) {
      return sendResponse(
        res,
        400,
        "failure",
        "team with same name already exists"
      );
    }

    req.updateTeam = {
      team,
      newTeamName,
      newTeamDescription,
    };
    console.log("BODY FROM FRONTEND:", req.body);

    next();

  } catch (err) {
    logger.log({
      level: "info",
      message: "error in updateTeamValidator >>>>>",
      error: err.message,
    });
  }

}

module.exports = updateTeamNameValidator;

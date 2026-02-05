const sendResponse = require("../../helper/sendResponse");
const generateTeamKey = require("../../helper/teamKey");
const logger = require("../../helper/logger");
const config = require("../../config/config.json");
const teamModel = require("../../models/teamModel");

// create team validator
async function createTeamValidator(req, res, next) {
  try {
    const userId = req.userId;
    const { teamname, teamdescription } = req.body;
    if (!teamname)
      return sendResponse(res, 400, "failure", "kindly send proper fields");
    if (teamdescription.length < 8 || teamdescription.length > 200) {
      return sendResponse(
        res,
        400,
        "failure",
        "teamdescription length must be between 8 to 200 characters"
      );
    }

    if (teamname.length < 4 || teamname.length > 25) {
      return sendResponse(
        res,
        400,
        "failure",
        "teamname length must be between 4 to 25 characters"
      );
    }
    const teamRegex = new RegExp(config.regex.teamNameRegex);

    if (!teamRegex.test(teamname))
      return sendResponse(
        res,
        400,
        "failure",
        "Only _ and - are allowed as special characters"
      );

    //generate team key
    const teamKey = await generateTeamKey();

    //check for duplicate team -- admin cannot create team with same name again
    const checkForDuplicateTeam = await teamModel.findOne({
      adminUserId: userId,
      teamName: teamname,
    });

    if (checkForDuplicateTeam)
      return sendResponse(res, 400, "failure", "Team Already found");

    //attach the filtered request to request handler
    req.createTeam = { teamname, teamdescription, teamKey };
  } catch (err) {
    logger.log({
      level: "info",
      message: "error in createTeamController >>>>>",
      error: err.message,
    });
  }
  next();
}

module.exports = createTeamValidator;

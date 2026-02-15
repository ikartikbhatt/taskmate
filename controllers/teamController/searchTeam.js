const teamModel = require("../../models/teamModel");
const sendResponse = require("../../helper/sendResponse");
const logger = require("../../helper/logger");

// search team
async function SearchTeam(req, res) {
  try {
    const teamKey = req.searchTeam;
    // console.log(teamKey);

    const listTeam = await teamModel.findOne({ teamKey });

    // console.log(listlistTeam);
    if (!listTeam) {
      return sendResponse(res, 404, "failure", "team not found");
    }

    const team = {
      adminId: listTeam?.adminUserId,
      teamName: listTeam?.teamName,
      teamDescription: listTeam?.teamDescription,
      teamKey: listTeam?.teamKey,
    };

    return sendResponse(res, 200, "success", "team found", team);
  } catch (err) {
    logger.log({
      level: "info",
      message: "error in searchTeamNameController >>>>>",
      error: err.message,
    });
  }
}

module.exports = SearchTeam;

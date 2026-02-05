const teamModel = require("../../models/teamModel");
const sendResponse = require("../../helper/sendResponse");
const logger = require("../../helper/logger");

// search team
async function SearchTeam(req, res) {
  try {
    const teamKey = req.SearchTeam;
    // console.log(teamKey);

    const listTeam = await teamModel.findOne(teamKey);
    // console.log(listTeam);

    const data = {
      adminId: listTeam?.adminUserId,
      teamName: listTeam?.teamName,
      teamDescription: listTeam?.teamDescription,
    };

    return sendResponse(res, 200, "success", "team found", data);
  } catch (err) {
    logger.log({
      level: "info",
      message: "error in searchTeamNameController >>>>>",
      error: err.message,
    });
  }
}

module.exports = SearchTeam;

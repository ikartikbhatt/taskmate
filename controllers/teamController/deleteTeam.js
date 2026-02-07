const teamModel = require("../../models/teamModel");
const sendResponse = require("../../helper/sendResponse");
const logger = require("../../helper/logger");

// delete team
async function deleteTeam(req, res) {
  try {
    const {teamKey} = req.deleteTeam;

    await teamModel.findOneAndDelete({teamKey});
    return sendResponse(res, 200, "success", "team deleted successfully");
  } catch (err) {
    logger.log({
      level: "info",
      message: "error in deleteTeamController >>>>>",
      error: err.message,
    });
  }
}

module.exports = deleteTeam;

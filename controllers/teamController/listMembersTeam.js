const sendResponse = require("../../helper/sendResponse");
const logger = require("../../helper/logger");
const teamModel = require("../../models/teamModel");

// list member teams
async function listMembersTeamController(req, res) {
  try {
    const userId = req.userId;

    const teams = await teamModel
      .find({
        members: {
          $elemMatch: {
            userId: userId,
            role: "member",
          },
        },
      })
      .select("teamName teamDescription teamKey members joinedAt");

    return sendResponse(res, 200, "success", "Teams found", teams);
  } catch (err) {
    logger.log({
      level: "error",
      message: "error in listMembersTeamController >>>>>",
      error: err.message,
    });

    return sendResponse(res, 500, "failure", "Internal server error");
  }
}

module.exports = listMembersTeamController;

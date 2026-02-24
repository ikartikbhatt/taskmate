const sendResponse = require("../../helper/sendResponse");
const logger = require("../../helper/logger");
const teamModel = require("../../models/teamModel");

// list admin teams
async function listAdminTeam(req, res) {
  try {
    const userId = req.userId;

    const teams = await teamModel
      .find({
        members: {
          $elemMatch: {userId: userId,role: "admin",},
        },
      })
      .select("teamName teamDescription teamKey members createdAt");

    return sendResponse(
      res,
      200,
      "success",
      "Admin teams fetched successfully",
      teams
    );
  } catch (err) {
    logger.log({
      level: "error",
      message: "error in listAdminTeam >>>>>",
      error: err.message,
    });
    return sendResponse(res, 500, "failure", "Server error");
  }
}

module.exports = listAdminTeam;
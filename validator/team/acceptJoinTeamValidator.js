const sendResponse = require("../../helper/sendResponse");
const logger = require("../../helper/logger");
const config = require("../../config/config.json");
const teamModel = require("../../models/teamModel");
const userModel = require("../../models/userModel");

// Team key regex
const teamKeyRegex = new RegExp(config.regex.teamKeyRegex);

// Request join team

async function acceptJoinTeamValidator(req, res, next) {
  try {
    const userId = req.userId;
    const { teamKey, requestUserId } = req.body;

    if (!teamKey || !requestUserId) {
      return sendResponse(res, 400, "failure", "Fields Not Proper");
    }

    if (teamKey.length > 25) {
      return sendResponse(
        res,
        400,
        "failure",
        "teamkey length must be less than 25 characters"
      );
    }

    if (!teamKeyRegex.test(teamKey))
      return sendResponse(
        res,
        400,
        "failure",
        "please provide proper teamKey format"
      );

    // search team
    const findTeam = await teamModel.findOne({ teamKey: teamKey });

    if (!findTeam) {
      return sendResponse(res, 400, "failure", "team not found");
    }

    // check current logged in user is the admin of the team
    const membersList = await teamModel
      .findOne({ teamKey })
      .select("members -_id");
    const membersArray = membersList.members;
    const checkAdmin = membersArray.find(
      (m) => m.userId.toString() === userId.toString() && m.role === "admin"
    );

    if (!checkAdmin) {
      return sendResponse(
        res,
        400,
        "failure",
        "only admin are allowed to accept team join requets or logged in user is not the admin of the team"
      );
    }

    const isMember = findTeam.members.find((m) => m.userId == requestUserId);

    if (isMember) {
      return sendResponse(res, 400, "failure", "User already in team");
    }

    const pendingrequest = findTeam.pendingRequests.find(
      (m) => m.userId == requestUserId
    );

    if (!pendingrequest) {
      return sendResponse(res, 400, "failure", "Kindly join the team first");
    }

    req.aceptJoinTeam = { teamKey, requestUserId };

    next();
  } catch (err) {
    logger.log({
      level: "info",
      message: "error in acceptJoinTeamValidator >>>>>",
      error: err.message,
    });
  }
}

module.exports = acceptJoinTeamValidator;

const teamModel = require("../../models/teamModel");
const sendResponse = require("../../helper/sendResponse");
const logger = require("../../helper/logger");

// Remove member from team validator

async function removeMemberValidator(req, res, next) {
  try {
    const adminUserId = req.userId;
    const { teamKey, removeUserId } = req.body;

    if (!teamKey || !removeUserId) {
      return sendResponse(res, 400, "failure", "provide proper inputs");
    }

    const team = await teamModel.findOne({ teamKey });

    if (!team) {
      return sendResponse(res, 400, "failure", "team not found");
    }

    // check admin
    if (team.adminUserId.toString() !== adminUserId) {
      return sendResponse(res, 400, "failure", "only admin can remove members");
    }

    // EDGE CASE : Admin can not remove themself
    if (team.adminUserId.toString() === removeUserId) {
      return sendResponse(
        res,
        400,
        "failure",
        "admin cannot remove themselves"
      );
    }

    const member = team.members.find(
      (m) => m.userId.toString() === removeUserId
    );

    if (!member) {
      return sendResponse(res, 400, "failure", "user not in team");
    }

    req.removeMember = {
      teamKey,
      removeUserId,
    };

    next();
  } catch (error) {
    logger.log({
      level: "error",
      message: "error in removeMemberValidator >>>>>",
      error: error.message,
    });
  }
}

module.exports = removeMemberValidator;

const teamModel = require("../../models/teamModel");
const sendResponse = require("../../helper/sendResponse");
const logger = require("../../helper/logger");

// remove member from team

async function removeMemberController(req, res) {
  try {
    const { teamKey, removeUserId } = req.removeMember;

    await teamModel.updateOne(
      { teamKey },
      {
        $pull: {
          members: { userId: removeUserId },
        },
      }
    );

    return sendResponse(res, 200, "success", "Member removed from team");
  } catch (err) {
    logger.log({
      level: "error",
      message: "error in removeMemberController >>>>>",
      error: err.message,
    });
  }
}

module.exports = removeMemberController;

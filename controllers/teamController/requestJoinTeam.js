const sendResponse = require("../../helper/sendResponse");
const logger = require("../../helper/logger");
const teamModel = require("../../models/teamModel");
const requestJoinTeamMail = require("../../helper/sendMail");
const userModel = require("../../models/userModel");
// Request join team

async function requestJoinTeamController(req, res) {
  try {
    const userId = req.userId;
    const { teamKey, message } = req.requestTeam;

    const findTeam = await teamModel
      .findOne({ teamKey })
      .populate("adminUserId", "name email");

    // Push join request
    findTeam.pendingRequests.push({
      userId: userId,
      message: message || "",
    });

    await findTeam.save();

    // requester
    const requester = await userModel.findById(req.userId);

    // Send email notification to team admin
    requestJoinTeamMail
      .requestJoinTeamMail({
        receiver: findTeam.adminUserId.email,
        teamOwnerName: findTeam.adminUserId.name,
        requesterName: requester.name,
        requesterEmail: requester.email,
        requesterId: userId,
        requesterMessage: message || "I would like to join your team.",
        teamName: findTeam.teamName,
        teamKey: findTeam.teamKey,
      })
      .catch((err) => {
        console.error("Failed to send join request email:", err);
      });

    return sendResponse(res, 200, "success", "Join request sent successfully", {
      teamName: findTeam.teamName,
      teamKey: findTeam.teamKey,
    });
  } catch (err) {
    logger.log({
      level: "error",
      message: "error in requestJoinTeamValidator >>>>>",
      error: err.message,
    });
  }
}

module.exports = requestJoinTeamController;

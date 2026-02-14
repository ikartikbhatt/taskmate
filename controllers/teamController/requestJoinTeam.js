const sendResponse = require("../../helper/sendResponse");
const logger = require("../../helper/logger");
const teamModel = require("../../models/teamModel");

// Request join team

async function requestJoinTeamController(req, res) {
    try {
        const userId = req.userId;
        const { teamKey, message } = req.requestTeam;

        const findTeam = await teamModel.findOne({ teamKey });

        // Push join request
        findTeam.pendingRequests.push({
            userId: userId,
            message: message || ""
        });

        await findTeam.save();

        return sendResponse(res, 200, "success", "Join request sent", {
            teamName: findTeam.teamName,
            teamKey: findTeam.teamKey
        });

    } catch (err) {
        logger.log({
            level: "info",
            message: "error in requestJoinTeamValidator >>>>>",
            error: err.message,
        });
    }
};

module.exports = requestJoinTeamController;
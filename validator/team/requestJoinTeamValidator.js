const sendResponse = require("../../helper/sendResponse");
const logger = require("../../helper/logger");
const config = require("../../config/config.json");
const teamModel = require("../../models/teamModel");

// Team key regex
const teamKeyRegex = new RegExp(config.regex.teamKeyRegex);

// Request join team

async function requestJoinTeamValidator(req, res, next) {
    try {
        const userId = req.userId;
        const teamKey = req.body?.teamKey;
        const message = req.body?.message;

        if (!teamKey) {
            return sendResponse(
                res,
                400,
                "failure",
                "teamKey is required"
            );
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

        if (message && (message.length < 8 || message.length > 200)) {
            return sendResponse(
                res,
                400,
                "failure",
                "message length must be between 8 to 200 characters"
            );
        };

        const findTeam = await teamModel.findOne({ teamKey: teamKey });

        if (!findTeam) {
            return sendResponse(res, 400, "failure", "team not found");
        };

        const isMember = findTeam.members.find(m => m.userId == userId);

        if (isMember) {
            return sendResponse(res, 400, "failure", "User already in team");
        };

        const pendingrequest = findTeam.pendingRequests.find(m => m.userId == userId);

        if (pendingrequest) {
            return sendResponse(res, 400, "failure", "request already pending");
        };

        req.requestTeam = { teamKey, message };

        next();

    } catch (err) {
        logger.log({
            level: "info",
            message: "error in requestJoinTeamValidator >>>>>",
            error: err.message,
        });
    }

};

module.exports = requestJoinTeamValidator;


const sendResponse = require("../../helper/sendResponse");
const logger = require("../../helper/logger");
const teamModel = require("../../models/teamModel");
const config = require("../../config/config.json");


// Team key regex
const teamKeyRegex = new RegExp(config.regex.teamKeyRegex);

// get pending join request

async function getPendingRequesValidator(req, res, next) {
    try {
        const userId = req.userId;
        const teamKey = req.body?.teamKey;

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

        const team = await teamModel.findOne({ teamKey });

        if (!team) {
            return sendResponse(res, 404, "failure", "team not found");
        }

        const isAdmin = team.members.find(m => m.userId == userId && m.role === "admin");

        if (!isAdmin){
            return sendResponse(res,404,"failure","only admin can access this");
        };

        req.getTeam=team;
        next();

    } catch (err) {
        logger.log({
            level: "info",
            message: "error in getPendingTeamValidator >>>>>",
            error: err.message,
        });
    }
};

module.exports=getPendingRequesValidator;
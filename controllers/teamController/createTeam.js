const teamModel = require("../../models/teamModel");
const userModel = require("../../models/userModel");
const sendResponse = require("../../helper/sendResponse");
const logger = require("../../helper/logger");

// create team
async function createTeam(req, res) {
  try {
    const { teamName, teamDescription, teamKey } = req.createTeam;
    const userId = req.userId;

    const getUserName = await userModel.findById(userId);
    const createTeam = await teamModel.create({
      adminUserId: userId,
      teamName: teamName,
      teamDescription: teamDescription || null,
      teamKey: teamKey,
      members: [
        { userId, role: "admin" }
      ],
    });

    // creating create team data object -->
    const data = {
      adminName: getUserName?.name,
      teamName: createTeam?.teamName,
      teamDescription: createTeam?.teamDescription,
      teamProfilePic: null,
      teamKey: createTeam?.teamKey,
      role: createTeam?.role,
      createdAt: createTeam?.createdAt,
    };

    return sendResponse(res, 200, "success", "Team Created Successfully", data);
  } catch (err) {
    logger.log({
      level: "info",
      message: "error in createTeamController >>>>>",
      error: err.message,
    });
  }
}

module.exports = createTeam;

const teamModel = require("../../models/teamModel");
const userModel = require("../../models/userModel");
const sendResponse = require("../../helper/sendResponse");
const logger = require("../../helper/logger");

// create team
async function acceptJoinTeam(req, res) {
  try {
    const userId = req.userId;
    const { teamKey, requestUserId } = req.aceptJoinTeam;

    const getUserName = await userModel.findById(userId);
    // const createTeam = await teamModel.create({
    //   adminUserId: userId,
    //   teamName: teamName,
    //   teamDescription: teamDescription || null,
    //   teamKey: teamKey,
    //   members: [
    //     { userId, role: "admin" }
    //   ],
    // });

    const addToTeam = await teamModel.findOneAndUpdate(
      { teamKey: teamKey },
      {
        // add memeber to array
        $push: {
          members: {
            userId: requestUserId,
            role: "member",
            joined: new Date(),
          },
        },
        //remove from pending request
        $pull: {
          pendingRequests: { userId: requestUserId },
        },
      },
      { new: true }
    );

    console.log(addToTeam);

    // creating create team data object -->
    const data = {
      adminName: getUserName?.name,
      teamName: addToTeam?.teamName,
      teamDescription: addToTeam?.teamDescription,
      teamProfilePic: null,
      teamKey: addToTeam?.teamKey,
      members: addToTeam?.members,
      pendingRequests: addToTeam?.pendingRequests,
      createdAt: addToTeam?.createdAt,
    };

    return sendResponse(res, 200, "success", "Team Created Successfully", data);
  } catch (err) {
    logger.log({
      level: "info",
      message: "error in acceptJoinTeamController >>>>>",
      error: err.message,
    });
  }
}

module.exports = acceptJoinTeam;

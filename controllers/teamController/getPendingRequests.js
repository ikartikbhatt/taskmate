const sendResponse = require("../../helper/sendResponse");
const logger = require("../../helper/logger");
const teamModel = require("../../models/teamModel");

async function getPendingRequestsController(req, res) {
  try {
    const {teamKey} = req.teamDetails;

    const team = await teamModel
        .findOne({ teamKey })
        .populate("pendingRequests.userId", "name email");
        // console.log(team)

    return sendResponse(res, 200, "success", "pending requet fetched succefully", team.pendingRequests);
  } catch (err) {
    logger.log({
      level: "info",
      message: "error in getPendingRequestcontroller >>>>>",
      error: err.message,
    });
  }
}

module.exports = getPendingRequestsController;

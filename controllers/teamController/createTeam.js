const team = require("../../models/teamModel");
const sendResponse = require("../../helper/sendResponse");
const generateTeamKey = require("../../helper/teamKey");
const logger = require("../../helper/logger");

// create team
async function createTeam(req, res, next) {
  try {
    const teamname = req.body?.teamname;
    const teamdescription = req.body?.teamdescription;
    if (!teamname) {
      return sendResponse(res, 400, "failure", "provide team teamname");
    }

    // unique key
    const uniqueKey = await generateTeamKey();
    const newteam = new team({
      teamname,
      teamdescription,
      teamKey: uniqueKey,
      role: "admin",
    });
    await newteam.save();
    const data = {
      teamname: newteam.teamname,
      teamdescription: newteam.teamdescription,
      role: newteam.role,
      createdAt: newteam.createdAt,
    };
    return sendResponse(res, 200, "success", "team created successfully", data);
  } catch (err) {
    logger.log({
      level: "info",
      message: "error in creatTeamController >>>>>",
      error: err.message,
    });
  }
}

module.exports = createTeam;

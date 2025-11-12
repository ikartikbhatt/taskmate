const crypto = require("crypto");
const team = require("../models/teamModel");

// Generate Team key
async function generateTeamKey() {
  let teamKey = crypto.randomBytes(6).toString("hex").toUpperCase();
  const exist = await team.findOne(teamKey);

  while (exist) {
    teamKey = crypto.randomBytes(6).toString("hex").toUpperCase();
  }
  return teamKey;
}





module.exports = generateTeamKey;




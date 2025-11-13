const { v4: uuidv4 } = require("uuid");

async function generateTeamKey() {
  return uuidv4().replace(/-/g, "").slice(0, 12).toUpperCase();
}

module.exports = generateTeamKey;

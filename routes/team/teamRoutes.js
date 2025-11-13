const express = require("express");
const teamRouter = express.Router();
const createTeam = require("../../controllers/teamController/createTeam");
// const authFn = require("../../middleware/authFn");

// create team
teamRouter.post("/createTeam", createTeam);

module.exports = teamRouter;

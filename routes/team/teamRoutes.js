const express = require("express");
const teamRouter = express.Router();
const createTeam = require("../../controllers/teamController/createTeam");
const createTeamValidator = require("../../validator/team/createTeamValidator");
const deleteTeamValidator = require("../../validator/team/deleteTeamValidator");
const deleteTeam = require("../../controllers/teamController/deleteTeam");
const updateTeamNameValidator = require("../../validator/team/upadteTeamValidator");
const updateTeamName = require("../../controllers/teamController/updateTeamName");
const searchTeamValidator = require("../../validator/team/searchTeamValidator");
const SearchTeam = require("../../controllers/teamController/searchTeam");
const listAdminTeam = require("../../controllers/teamController/listAdminTeam");

// create team
teamRouter.post("/createTeam", createTeamValidator, createTeam);

// delete team
teamRouter.post("/deleteTeam", deleteTeamValidator, deleteTeam);

// update team name
teamRouter.post("/updateTeam", updateTeamNameValidator, updateTeamName);

// search team
teamRouter.post("/searchTeam",searchTeamValidator,SearchTeam);

// Get admin teams
teamRouter.get("/listAdminTeams",listAdminTeam);

module.exports = teamRouter;

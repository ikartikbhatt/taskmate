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
const requestjoinTeamValidator = require("../../validator/team/requestJoinTeamValidator");
const requestJoinTeamController = require("../../controllers/teamController/requestJoinTeam");
const getPendingRequestsController = require("../../controllers/teamController/getPendingRequests");
const getPendingRequesValidator = require("../../validator/team/getPendingRequestValidator");
const acceptJoinTeamValidator = require("../../validator/team/acceptJoinTeamValidator");
const acceptJoinTeam = require("../../controllers/teamController/acceptJoinTeam");

// create team
teamRouter.post("/createTeam", createTeamValidator, createTeam);

// delete team
teamRouter.post("/deleteTeam", deleteTeamValidator, deleteTeam);

// update team name
teamRouter.patch("/updateTeam", updateTeamNameValidator, updateTeamName);

// search team
teamRouter.post("/searchTeam", searchTeamValidator, SearchTeam);

// Get admin teams
teamRouter.get("/listAdminTeams", listAdminTeam);

// Request join Team
teamRouter.post(
  "/requestJoinTeam",
  requestjoinTeamValidator,
  requestJoinTeamController
);

//accept join request
teamRouter.post("/acceptJoinTeam", acceptJoinTeamValidator, acceptJoinTeam);

// get pending request
teamRouter.post(
  "/pendingRequests",
  getPendingRequesValidator,
  getPendingRequestsController
);

module.exports = teamRouter;

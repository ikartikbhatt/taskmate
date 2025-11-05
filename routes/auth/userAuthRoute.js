const express = require("express");
const signupValidator = require("../../validator/auth/signupValidator");
const signUp = require("../../controllers/auth/signUp");

const authRouter = express.Router();

authRouter.post("/signup", signupValidator, signUp);

module.exports = authRouter;

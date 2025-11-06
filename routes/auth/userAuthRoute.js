const express = require("express");
const signupValidator = require("../../validator/auth/signupValidator");
const signUp = require("../../controllers/auth/signUp");
const loginValidator = require("../../validator/auth/loginValidator");
const login = require("../../controllers/auth/login");

const authRouter = express.Router();

// Sign up
authRouter.post("/signup", signupValidator, signUp);

// login
authRouter.post("/login", loginValidator, login);

module.exports = authRouter;

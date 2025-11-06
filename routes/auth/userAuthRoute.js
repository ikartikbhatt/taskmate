const express = require("express");
const signupValidator = require("../../validator/auth/signupValidator");
const signUp = require("../../controllers/auth/signUp");
const loginValidator = require("../../validator/auth/loginValidator");
const login = require("../../controllers/auth/login");
const authFn = require("../../middleware/authFn");
const authRouter = express.Router();
const userModel = require("../../models/userModel");

// Sign up
authRouter.post("/signup", signupValidator, signUp);

// login
authRouter.post("/login", loginValidator, login);

module.exports = authRouter;

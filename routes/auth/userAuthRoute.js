const express = require("express");
const authRouter = express.Router();
const signupValidator = require("../../validator/auth/signupValidator");
const signUp = require("../../controllers/authController/signUp");
const authFn = require("../../middleware/authFn");
const loginValidator = require("../../validator/auth/loginValidator");
const login = require("../../controllers/authController/login");
const logout = require("../../controllers/authController/logout");
const resetPassValidator = require("../../validator/auth/resetPassValidator");
const resetPass = require("../../controllers/authController/resetPass");
const setNewPasswordValidation = require("../../validator/auth/setNewPasswordValidation");
const setNewPassword = require("../../controllers/authController/setNewPassword");

// Sign up
authRouter.post("/signup", signupValidator, signUp);

// login
authRouter.post("/login", loginValidator, login);

// logout
authRouter.get("/logout", logout);

// reset Password
authRouter.post("/resetpass", authFn, resetPassValidator, resetPass);

//forget Password
authRouter.patch("/set-new-password", setNewPasswordValidation, setNewPassword);

module.exports = authRouter;

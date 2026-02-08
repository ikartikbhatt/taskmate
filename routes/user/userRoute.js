const express = require("express");
const userRouter = express.Router();
const updateProfileValidator = require("../../validator/user/updateUserValidator");
const updateProfileController=require("../../controllers/userController/updateUserController")
const getUserProfileController=require("../../controllers/userController/getUserProfileController")


// update user profile
userRouter.patch("/updateProfile",updateProfileValidator,updateProfileController);

// get user profile
userRouter.get("/profile",getUserProfileController);

module.exports = userRouter;

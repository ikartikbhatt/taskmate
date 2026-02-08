const express = require("express");
const userRouter = express.Router();
const updateProfileValidator = require("../../validator/user/updateUserValidator");
const updateProfileController=require("../../controllers/userController/updateUserController")
const getUserProfileController=require("../../controllers/userController/getUserProfileController")


// update user profile
router.patch("/updateProfile",updateProfileValidator,updateProfileController);

// get user profile
router.get("/profile",getUserProfileController);

module.exports = userRouter;

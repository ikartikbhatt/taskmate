const userModel = require("../../models/userModel");
const sendResponse=require("../../helper/sendResponse");
const logger = require("../../helper/logger");

async function getUserProfileController (req,res){
try {
    const userId=req.userId;
    const user=await userModel.findById(userId).select("-password");
    return sendResponse(res, 200, "Success", "User found", user);

} catch (error) {
     logger.log({
      level: "info",
      message: "error in updataProfileController >>>>>",
      error: err.message,
    });
}
};

module.exports=getUserProfileController;

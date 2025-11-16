const sendResponse = require("../../helper/sendResponse");
const logger = require("../../helper/logger");
const teamModel=require("../../models/teamModel")

// list admin team avlidator
async function listAdminTeam(req,res){
try {
    const userId=req.userId;

    console.log(userId);
    
    const teams=await teamModel.find({adminUserId: userId, role: "admin"}).select("teamName teamDescription teamKey");

    if (!teams){
        return sendResponse(res,400,"failure","You do not admin of any team");
    }

    
    return sendResponse(res,200,"success","team found are:-",teams);

} catch (err) {
     logger.log({
            level: "info",
            message: "error in searchTeamValidator >>>>>",
            error: err.message,
        });
}
};

module.exports=listAdminTeam;
const sendResponse = require("../../helper/sendResponse");

async function logout(req, res) {
  try {
    res.clearCookie("taskmate");
    return sendResponse(res, 200, "success", "user logged out successfully");
  } catch (err) {
    logger.log({
      level: "info",
      message: "error in logOutController >>>>>",
      error: err.message,
    });
  }
}

module.exports = logout;

const logger = require("../../helper/logger");

async function signUp(req, res) {
  try {
    const data = req.userData;
    console.log(data);

    res.send("ok");
  } catch (err) {
    logger.log({
      level: "info",
      message: "error in signupController >>>>>",
      error: err.message,
    });
  }
}

module.exports = signUp;

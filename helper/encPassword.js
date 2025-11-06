const bcrypt = require("bcrypt");
const logger = require("../helper/logger");

// encPassword
async function encPass(password, key, hashedPass, salt = 10) {
  try {
    if (key === "encrypt") {
      const passSalt = await bcrypt.genSalt(salt);
      const hashedPass = await bcrypt.hash(password, passSalt);
      return hashedPass;
    } else if (key === "decrypt") {
      const passCompare = await bcrypt.compare(password, hashedPass);
      return passCompare;
    } else {
      logger.log({
        level: "info",
        message:
          "error in helper encPassword encrypt and decrypt not provided>>>>",
      });
    }
  } catch (err) {
    logger.log({
      level: "error",
      message: "error in helper encPassword>>>>",
      error: err.message,
    });
  }
}

module.exports = encPass;

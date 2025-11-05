const logger = require("./logger");

async function sendResponse(res, resCode, status, message, level = "info") {
  const template = {
    resCode: resCode,
    status: status,
    message: message,
  };

  logger.log({
    level: level,
    message: message,
  });

  return res.status(resCode).json(template);
}

module.exports = sendResponse;

const logger = require("./logger");

async function sendResponse(
  res,
  resCode,
  status,
  message,
  data,
  level = "info"
) {
  const template = {
    resCode: resCode,
    status: status,
    message: message,
    data: data,
  };

  logger.log({
    level: level,
    message: message,
    data: data,
  });

  return res.status(resCode).json(template);
}

module.exports = sendResponse;

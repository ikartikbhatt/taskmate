// setting up winston library which will be used for logging
const winston = require("winston");
const path = require("path");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.prettyPrint()
  ),
  //to create logging file
  transports: [
    //for only errors
    new winston.transports.File({
      filename: path.join(__dirname, "../log/error.log"),
      level: "error",
    }),
    //only for writing project errors
    new winston.transports.File({
      filename: path.join(__dirname, "../log/info.log"),
    }),
  ],
});

module.exports = logger;

const mongoose = require("mongoose");
const logger = require("../helper/logger");
async function connectToDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // wait up to 5 seconds
    });
    logger.log({
      level: "info",
      message: "DB Connection Successful",
    });
  } catch (err) {
    logger.log({
      level: "error",
      message: `DB Connection Failed`,
      error: err.message,
    });
    throw new Error(err);
  }
}

module.exports = connectToDb;

const express = require("express");
const logger = require("../../helper/logger");
const sendResponse = require("../../helper/sendResponse");
// to filter the actual / authentic request
async function signupValidator(req, res, next) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return sendResponse(res, 400, "failure", "provide proper input");
    }

    //assume request has been filtered out
    req.userData = { name, email, password };
    logger.log({
      level: "info",
      message: "user SignupValidator passed >>>",
      data: req.userData,
    });
  } catch (err) {
    logger.log({
      level: "info",
      message: "error in signupvalidator >>>>>",
      error: err.message,
    });
  }

  next();
}

module.exports = signupValidator;

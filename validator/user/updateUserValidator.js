const logger = require("../../helper/logger");
const sendResponse = require("../../helper/sendResponse");

// update user profile
async function updateProfileValidator(req, res, next) {
  try {
    const { name, designation, bio, location } = req.body;

    function isValid(value, min, max) {
      return (
        typeof value === "string" &&
        value.trim().length >= min &&
        value.trim().length <= max
      );
    }

    if (name !== undefined && !isValid(name, 2, 40)) {
      return sendResponse(res, 400, "failure", "Name must be 2–40 characters");
    }

    if (designation !== undefined && !isValid(designation, 2, 40)) {
      return sendResponse(
        res,
        400,
        "failure",
        "Designation must be 2–40 characters"
      );
    }

    if (location !== undefined && !isValid(location, 2, 50)) {
      return sendResponse(
        res,
        400,
        "failure",
        "Location must be 2–50 characters"
      );
    }

    if (bio !== undefined && !isValid(bio, 5, 200)) {
      return sendResponse(res, 400, "failure", "Bio must be 5–200 characters");
    }

    req.updateProfile = {
      name: name?.trim(),
      designation: designation?.trim(),
      location: location?.trim(),
      bio: bio?.trim(),
    };

    next();
  } catch (error) {
    logger.log({
      level: "info",
      message: "error in updataProfileValidator >>>>>",
      error: err.message,
    });
  }
}

module.exports = updateProfileValidator;

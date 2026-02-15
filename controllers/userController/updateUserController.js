const logger = require("../../helper/logger");
const sendResponse = require("../../helper/sendResponse");
const userModel = require("../../models/userModel");

// user profile update controller
async function updateProfileController(req, res) {
  try {
    const userId = req.userId;
    const { name, designation, location, bio } = req.updateProfile;

    const user = await userModel.findById(userId);

    if (!user) {
      return sendResponse(res, 404, "failure", "User not found");
    }

    if (name !== undefined) {
      user.name = name;
    }

    if (designation !== undefined) {
      user.designation = designation;
    }

    if (location !== undefined) {
      user.location = location;
    }

    if (bio !== undefined) {
      user.bio = bio;
    }

    await user.save();

    const newUser = {
      name: user?.name,
      designation: user?.designation,
      location: user?.location,
      bio: user?.bio,
    };

    return sendResponse(res, 200, "success", "User updated", newUser);
  } catch (error) {
    logger.log({
      level: "info",
      message: "error in updataProfileController >>>>>",
      error: err.message,
    });
  }
}

module.exports = updateProfileController;

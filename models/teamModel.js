const mongoose = require("mongoose");

// team schema
const teamSchema = new mongoose.Schema(
  {
    adminUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    teamName: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    teamKey: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    teamDescription: {
      type: String,
      trim: true,
    },
    members: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
        },
        role: {
          type: String,
          enum: ["admin", "member"],
          default: "member",
          required: true,
        },
        joinedAt: { type: Date, default: Date.now },
      },
    ],
    pendingRequests: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
        },
        requestedAt: { type: Date, default: Date.now },
        message: { type: String, default: "" },
      },
    ],
  },
  { timestamps: true }
);

const teamModel = mongoose.model("team", teamSchema);
module.exports = teamModel;

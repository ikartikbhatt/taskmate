const mongoose = require("mongoose");

// team schema
const teamSchema = new mongoose.Schema(
  {
    teamname: {
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
    teamdescription:{
      type:String,
      trim:true,
    },
    role: {
      type: String,
      enum: ["admin", "member"],
      required: true,
    },
    pendingRequests: [
      {
        user: {
          type:mongoose.Schema.Types.ObjectId,
          ref:"user",
        },
        requestedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const teamModel = mongoose.model("team", teamSchema);
module.exports = teamModel;

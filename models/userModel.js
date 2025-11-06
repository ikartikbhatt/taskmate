const mongoose = require("mongoose");

//User Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      trim: true,
      lowercase: true,
      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/, "enter a valid email"],
    },
    password: {
      type: String,
      required: true,
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
        "Password must be 8 characters long and include uppercase, lowercase, number, and special character.",
      ],
    },
    role: {
      type: String,
      trim: true,
      enum: ["user", "admin"],
      default: "user",
      lowercase: true,
    },
    designation: {
      type: String,
      trim: true,
      lowercase: true,
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;

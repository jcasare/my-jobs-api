const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, `name must be provided`],
    minLength: [3, "name cannot be less than 2 characters"],
    maxLength: [50, "name cannot exceed 20 characters"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, `email must be provided`],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "please provide password"],
    minLength: [8, "password cannot be less than 6 characters"],
    maxLength: [12, "password cannot exceed 12 characters"],
  },
});

module.exports = mongoose.model("User", UserSchema);

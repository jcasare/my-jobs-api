const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    position: {
      type: String,
      required: [true, "Please provide position"],
      maxLength: [100],
    },
    company: {
      type: String,
      required: [true, "Please provide company name"],
      minLength: [3, "Please enter a job exceeding 3 characters"],
      maxLength: [20, "Please enter a job less than or equal to 20 characters"],
    },
    status: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);

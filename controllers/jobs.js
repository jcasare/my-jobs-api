const { StatusCodes } = require("http-status-codes");
const Job = require("../models/Job");
const { BadRequestError, NotFoundError } = require("../errors");
const { findOneAndDelete } = require("../models/Job");
const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userID }).sort("createdAt");

  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};
const getJob = async (req, res) => {
  const {
    user: { userID },
    params: { id: jobID },
  } = req;
  const job = await Job.findOne({ _id: jobID, createdBy: userID });
  if (!job) {
    throw new NotFoundError(`Job with ID ${jobID} doesn't exist`);
  }
  res.status(StatusCodes.OK).json({ job });
};
const createJob = async (req, res) => {
  const { userID } = req.user;
  req.body.createdBy = userID;
  const existingJob = await Job.findOne({ ...req.body });
  if (existingJob) {
    return res.status(200).json({ msg: "This record exists already" });
  }
  const job = await Job.create({ ...req.body });

  res.status(StatusCodes.CREATED).json({ job });
};
const updateJob = async (req, res) => {
  const {
    body: { company, position },
    user: { userID },
    params: { id: jobID },
  } = req;
  req.body.createdBy = userID;
  const job = await Job.findOneAndReplace(
    { _id: jobID, createdBy: userID },
    { ...req.body },
    { new: true, runValidators: true }
  );
  if (company === "" || position === "") {
    throw BadRequestError("Company and Position fields cannot be empty");
  }
  if (!job) {
    throw new NotFoundError(`Job with ID ${jobID} doesn't exist`);
  }
  res.status(StatusCodes.OK).json({ job });
};
const deleteJob = async (req, res) => {
  const {
    user: { userID },
    params: { id: jobID },
  } = req;
  const job = await Job.findOneAndDelete({ _id: jobID, createdBy: userID });
  if (!job) {
    throw new NotFoundError(`Job with ID ${jobID} doesn't exist`);
  }
  res
    .status(StatusCodes.OK)
    .json({ msg: `Job with ID ${jobID} has been deleted` });
};

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };

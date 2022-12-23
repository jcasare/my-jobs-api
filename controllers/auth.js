const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
require("dotenv").config();

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new BadRequestError(
      "A user with this email already exists...Please login"
    );
  }
  const user = await User.create({ ...req.body });

  const token = user.genToken();
  res
    .status(StatusCodes.CREATED)
    .json({ msg: "user created", user: { name: user.name }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide your email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError(
      "No account with this email exists. Please register!"
    );
  }
  const passwordCheck = await user.comparePassword(password);
  if (!passwordCheck) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const token = user.genToken();
  res
    .status(StatusCodes.OK)
    .json({ msg: `login successful`, user: { name: user.name }, token });
};

module.exports = { register, login };

const jwt = require("jsonwebtoken");
const User = require("../models/User");
const UnauthenticatedError = require("../errors/unauthenticated");
require("dotenv").config();

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Not authorized for this route");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userID: payload.userID, name: payload.name };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Not authorized for this route");
  }
};

module.exports = authMiddleware;

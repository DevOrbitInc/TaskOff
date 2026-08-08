const jwt = require("jsonwebtoken");
const User = require("../models/User");
const config = require("../config/env");
const ApiError = require("../utils/ApiError");

async function protect(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(ApiError.unauthorized("No token provided. Please log in."));
    }

    const token = authHeader.split(" ")[1];

    let decoded;
    try {
      decoded = jwt.verify(token, config.jwtSecret);
    } catch (error) {
      // jsonwebtoken errors (TokenExpiredError / JsonWebTokenError) are
      // translated into friendly messages by the central error handler.
      return next(error);
    }

    const user = await User.findById(decoded.id).select("-passwordHash");
    if (!user) {
      return next(ApiError.unauthorized("User no longer exists."));
    }

    req.user = user;
    next();
  } catch (error) {
    return next(error);
  }
}

module.exports = { protect };

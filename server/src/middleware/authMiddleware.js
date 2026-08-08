const jwt = require("jsonwebtoken");
const User = require("../models/User");
const config = require("../config/env");

async function protect(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided. Please log in." });
    }

    const token = authHeader.split(" ")[1];

    let decoded;
    try {
      decoded = jwt.verify(token, config.jwtSecret);
    } catch (error) {
      return res.status(401).json({ message: "Invalid or expired token." });
    }

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User no longer exists." });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Authentication error.", error: error.message });
  }
}

module.exports = { protect };

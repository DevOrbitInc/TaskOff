const User = require("../models/User");

async function getUsers(req, res, next) {
  try {
    const users = await User.find().select("fullName").sort({ fullName: 1 });
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
}

module.exports = { getUsers };

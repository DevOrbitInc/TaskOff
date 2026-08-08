const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generateToken } = require("../utils/generateToken");
const ApiError = require("../utils/ApiError");

// Input shape/format (required fields, email format, password length) is
// already validated by validate() + validators/auth.validator.js before
// these handlers run. This file only does things Zod can't: checking the
// database and hashing/comparing the password.

async function register(req, res, next) {
  try {
    const { fullName, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(ApiError.conflict("An account with this email already exists.", [
        { field: "email", message: "This email is already registered." },
      ]));
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await User.create({
      fullName,
      email,
      passwordHash,
    });

    const token = generateToken(user._id);

    return res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    return next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return next(ApiError.unauthorized("Invalid email or password."));
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return next(ApiError.unauthorized("Invalid email or password."));
    }

    const token = generateToken(user._id);

    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = { register, login };

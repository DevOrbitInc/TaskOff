const { z } = require("zod");
const { requiredString, email } = require("./common.validator");

const registerSchema = z.object({
  fullName: requiredString("Full name")
    .trim()
    .min(2, "Full name must be at least 2 characters.")
    .max(60, "Full name must be at most 60 characters."),
  email,
  password: requiredString("Password")
    .min(8, "Password must be at least 8 characters.")
    // bcrypt silently ignores anything past 72 bytes, so reject it up front.
    .max(72, "Password must be at most 72 characters."),
});

const loginSchema = z.object({
  email,
  password: requiredString("Password").min(1, "Password is required."),
});

module.exports = { registerSchema, loginSchema };

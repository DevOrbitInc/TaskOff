const { z } = require("zod");

/**
 * A required text field whose "missing" and "wrong type" messages read like
 * form errors instead of Zod's default "expected string, received undefined".
 *
 *   requiredString("Full name").trim().min(2, "...")
 */
function requiredString(label) {
  return z.string({
    error: (issue) =>
      issue.input === undefined ? `${label} is required.` : `${label} must be text.`,
  });
}

/** A MongoDB ObjectId as it arrives in a URL, e.g. "/api/tasks/:id". */
const objectId = requiredString("Id")
  .trim()
  .regex(/^[0-9a-fA-F]{24}$/, "Must be a valid id.");

/** Trims and lowercases first, then checks the shape, so " A@B.com " is accepted. */
const email = requiredString("Email")
  .trim()
  .toLowerCase()
  .pipe(z.email("Enter a valid email address."));

module.exports = { requiredString, objectId, email };

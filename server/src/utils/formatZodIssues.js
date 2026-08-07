/**
 * Flattens a ZodError into the `details` array used by our error shape:
 *
 *   [{ field: "email", message: "Enter a valid email address." }]
 *
 * Nested paths are joined with dots ("address.city"). Issues that apply to
 * the whole object rather than one field are reported as "(root)".
 */
function formatZodIssues(error) {
  return error.issues.map((issue) => ({
    field: issue.path.length > 0 ? issue.path.join(".") : "(root)",
    message: issue.message,
  }));
}

module.exports = formatZodIssues;

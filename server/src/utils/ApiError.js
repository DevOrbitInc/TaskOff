/**
 * An error we deliberately send back to the client.
 *
 * Every ApiError carries the HTTP status, a stable machine-readable `code`
 * the frontend can branch on, a human message, and optionally a `details`
 * array of per-field problems. The central error handler renders it — see
 * middleware/errorHandler.js.
 *
 *   throw ApiError.notFound("Task not found.");
 *   return next(ApiError.forbidden());
 */
class ApiError extends Error {
  constructor(statusCode, code, message, details) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    Error.captureStackTrace(this, ApiError);
  }

  static badRequest(message = "Bad request.", details) {
    return new ApiError(400, "BAD_REQUEST", message, details);
  }

  static validation(details, message = "Invalid request data.") {
    return new ApiError(400, "VALIDATION_ERROR", message, details);
  }

  static unauthorized(message = "Authentication required.") {
    return new ApiError(401, "UNAUTHORIZED", message);
  }

  static forbidden(message = "You are not allowed to do that.") {
    return new ApiError(403, "FORBIDDEN", message);
  }

  static notFound(message = "Resource not found.") {
    return new ApiError(404, "NOT_FOUND", message);
  }

  static conflict(message = "Resource already exists.", details) {
    return new ApiError(409, "CONFLICT", message, details);
  }

  static internal(message = "Something went wrong on our side.") {
    return new ApiError(500, "INTERNAL_ERROR", message);
  }
}

module.exports = ApiError;

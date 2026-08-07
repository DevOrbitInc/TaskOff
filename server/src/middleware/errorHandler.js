const { ZodError } = require("zod");
const config = require("../config/env");
const ApiError = require("../utils/ApiError");
const formatZodIssues = require("../utils/formatZodIssues");

/**
 * Translates whatever was thrown into an ApiError, so the handler below only
 * ever has one kind of error to render.
 */
function toApiError(err) {
  if (err instanceof ApiError) return err;

  // A schema parsed outside the validate() middleware.
  if (err instanceof ZodError) return ApiError.validation(formatZodIssues(err));

  // express.json() refused the body.
  if (err.type === "entity.parse.failed") {
    return ApiError.badRequest("Request body is not valid JSON.");
  }
  if (err.type === "entity.too.large") {
    return new ApiError(413, "PAYLOAD_TOO_LARGE", "Request body is too large.");
  }

  // Mongoose schema validation — the safety net behind our Zod schemas.
  if (err.name === "ValidationError" && err.errors) {
    const details = Object.values(err.errors).map((issue) => ({
      field: issue.path,
      message: issue.message,
    }));
    return ApiError.validation(details);
  }

  // Mongoose could not cast a value, almost always a malformed ObjectId.
  if (err.name === "CastError") {
    return ApiError.validation([
      { field: err.path, message: `"${err.value}" is not a valid ${err.kind}.` },
    ]);
  }

  // MongoDB unique index violated, e.g. an already registered email.
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || "value";
    const message = `This ${field} is already in use.`;
    return ApiError.conflict(message, [{ field, message }]);
  }

  // jsonwebtoken, thrown by the auth middleware on a bad or stale token.
  if (err.name === "TokenExpiredError") {
    return ApiError.unauthorized("Your session has expired. Please log in again.");
  }
  if (err.name === "JsonWebTokenError") {
    return ApiError.unauthorized("Invalid authentication token.");
  }

  // Anything unrecognised is a bug on our side: never leak it to the client.
  return ApiError.internal();
}

/**
 * The single place every error response is built.
 *
 *   {
 *     "success": false,
 *     "error": {
 *       "code": "VALIDATION_ERROR",
 *       "message": "Invalid request data.",
 *       "details": [{ "field": "email", "message": "Enter a valid email address." }]
 *     }
 *   }
 *
 * `details` is only present when the error is about specific fields.
 * Mount this last, after the routes and the notFound handler.
 */
// eslint-disable-next-line no-unused-vars -- Express only recognises 4-arg functions as error handlers
function errorHandler(err, req, res, next) {
  // The response already started streaming; Express must close the connection.
  if (res.headersSent) return next(err);

  const apiError = toApiError(err);

  if (apiError.statusCode >= 500) {
    console.error(`[ERROR] ${req.method} ${req.originalUrl}`, err);
  }

  const error = {
    code: apiError.code,
    message: apiError.message,
  };

  if (apiError.details) error.details = apiError.details;

  // Server-side bugs are opaque in production but debuggable locally.
  if (apiError.statusCode >= 500 && config.env === "development") {
    error.stack = err.stack;
  }

  res.status(apiError.statusCode).json({ success: false, error });
}

module.exports = errorHandler;

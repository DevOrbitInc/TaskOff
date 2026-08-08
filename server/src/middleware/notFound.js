const ApiError = require("../utils/ApiError");

/**
 * Catches any request that matched no route and turns it into a normal
 * NOT_FOUND ApiError, so an unknown URL answers with the same JSON shape as
 * every other error instead of Express' default HTML page.
 *
 * Mount this after all routes and before the error handler.
 */
function notFound(req, res, next) {
  next(ApiError.notFound(`Route ${req.method} ${req.originalUrl} does not exist.`));
}

module.exports = notFound;

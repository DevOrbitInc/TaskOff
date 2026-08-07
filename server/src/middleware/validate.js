const ApiError = require("../utils/ApiError");
const formatZodIssues = require("../utils/formatZodIssues");

const SOURCES = ["body", "params", "query"];

/**
 * Validates a request against one Zod schema per request part.
 *
 *   router.post("/", validate({ body: createTaskSchema }), createTask);
 *   router.patch("/:id", validate({ params: taskIdParamSchema, body: updateTaskSchema }), updateTask);
 *
 * On success the parsed values (trimmed, coerced, unknown keys stripped) are
 * put on `req.validated.body` / `.params` / `.query`. `req.body` is also
 * replaced with the parsed body, so controllers can keep reading `req.body`
 * as usual. `req.query` and `req.params` are read-only in Express 5, so their
 * validated versions must be read from `req.validated`.
 *
 * On failure every invalid field across all parts is collected into a single
 * VALIDATION_ERROR handed to the central error handler — the client gets the
 * whole list at once instead of one field per round trip.
 */
function validate(schemas) {
  return (req, res, next) => {
    const validated = {};
    const details = [];

    for (const source of SOURCES) {
      const schema = schemas[source];
      if (!schema) continue;

      // Express 5 leaves req.body undefined when the request had no body;
      // parsing {} instead gives "X is required" rather than "expected object".
      const result = schema.safeParse(req[source] ?? {});

      if (result.success) {
        validated[source] = result.data;
      } else {
        details.push(...formatZodIssues(result.error));
      }
    }

    if (details.length > 0) return next(ApiError.validation(details));

    req.validated = validated;
    if (validated.body !== undefined) req.body = validated.body;

    next();
  };
}

module.exports = validate;

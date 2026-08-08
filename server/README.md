# TaskOff API — validation & error conventions

Every endpoint in this API answers with the same two shapes. Frontend can
write the error handling once and never special-case a route.

## Success

```json
{ "success": true, "data": { "...": "..." } }
```

Use the HTTP status for meaning: `200` read/update, `201` created, `204` deleted.

## Error

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request data.",
    "details": [{ "field": "email", "message": "Enter a valid email address." }]
  }
}
```

- `code` is stable and safe to branch on in the frontend; `message` is for humans
  and may be reworded at any time.
- `details` is only present when the error concerns specific fields. `field` is a
  dot path (`"address.city"`), or `"(root)"` when the problem is with the request
  as a whole.
- `500` responses never expose internals — they always read
  `"Something went wrong on our side."` The real error is logged server-side, and
  a `stack` is added to the response only when `NODE_ENV=development`.

### Codes

| Code | Status | When |
|---|---|---|
| `VALIDATION_ERROR` | 400 | A field failed validation |
| `BAD_REQUEST` | 400 | Malformed request, e.g. body isn't valid JSON |
| `UNAUTHORIZED` | 401 | Missing, invalid, or expired token |
| `FORBIDDEN` | 403 | Logged in, but not allowed to touch this resource |
| `NOT_FOUND` | 404 | Unknown route, or the resource doesn't exist |
| `CONFLICT` | 409 | Unique constraint hit, e.g. email already registered |
| `PAYLOAD_TOO_LARGE` | 413 | Body exceeds the body-parser limit |
| `INTERNAL_ERROR` | 500 | Unhandled bug on our side |

## Validating a route

Schemas live in `src/validators/`, one file per resource. Add `validate(...)`
between the path and the controller:

```js
const validate = require("../middleware/validate");
const { createTaskSchema, updateTaskSchema, taskIdParamSchema } = require("../validators/task.validator");

router.post("/", validate({ body: createTaskSchema }), createTask);
router.patch("/:id", validate({ params: taskIdParamSchema, body: updateTaskSchema }), updateTask);
```

After `validate` runs:

- `req.body` is the **parsed** body — trimmed, lowercased where relevant, and
  with unknown keys stripped. Read it as usual.
- `req.validated.params` / `req.validated.query` hold the parsed params and
  query. Express 5 makes `req.query` and `req.params` read-only, so they can't
  be overwritten in place — read them from `req.validated`.

Anything the client must not control (`assignee` on a task) is left out of the
schema on purpose: it gets stripped, and the controller sets it from the
authenticated user.

## Raising an error from a controller

Never build an error response by hand — throw an `ApiError` and let the central
handler render it. Express 5 forwards throws from `async` handlers automatically,
so no `try/catch` is needed just to pass an error along.

```js
const ApiError = require("../utils/ApiError");

const task = await Task.findById(req.validated.params.id);
if (!task) throw ApiError.notFound("Task not found.");
if (!task.assignee.equals(req.user._id)) throw ApiError.forbidden();
```

Available: `badRequest`, `validation`, `unauthorized`, `forbidden`, `notFound`,
`conflict`, `internal`.

Mongoose and JWT errors don't need any handling either — validation failures,
malformed ObjectIds, duplicate-key (`11000`), and expired/invalid tokens are all
translated into the shape above by `src/middleware/errorHandler.js`.

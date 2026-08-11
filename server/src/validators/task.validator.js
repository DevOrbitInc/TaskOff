const { z } = require("zod");
const Task = require("../models/Task");
const { requiredString, objectId } = require("./common.validator");

// Read straight off the model so the allowed values can never drift apart
// from the schema Mongoose actually enforces.
const TASK_STATUSES = Task.schema.path("status").enumValues;

const status = z.enum(TASK_STATUSES, {
  error: `Status must be one of: ${TASK_STATUSES.join(", ")}.`,
});

const tag = z.string().trim().max(50, "Tag must be at most 50 characters.").optional();


const title = requiredString("Title")
  .trim()
  .min(1, "Title is required.")
  .max(120, "Title must be at most 120 characters.");

// Empty is allowed on purpose: it is how an update clears a description
const description = requiredString("Description").trim();


const createTaskSchema = z.object({
  title,
  description: description.optional(),
  status: status.optional(),
  tag: tag.optional(),
  assignee: objectId.optional(),
});

const updateTaskSchema = z
  .object({ title, description, status, tag, assignee: objectId, })
  .partial()
  .refine((body) => Object.keys(body).length > 0, {
    error: "Provide at least one field to update.",
  });

const taskIdParamSchema = z.object({ id: objectId });

const listTasksQuerySchema = z.object({
  status: status.optional(),
  assignee: objectId.optional(),
});

module.exports = {
  createTaskSchema,
  updateTaskSchema,
  taskIdParamSchema,
  listTasksQuerySchema,
};

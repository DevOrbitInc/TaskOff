const { z } = require("zod");
const Task = require("../models/Task");
const { requiredString, objectId } = require("./common.validator");

// Read straight off the model so the allowed values can never drift apart
// from the schema Mongoose actually enforces.
const TASK_STATUSES = Task.schema.path("status").enumValues;

const status = z.enum(TASK_STATUSES, {
  error: `Status must be one of: ${TASK_STATUSES.join(", ")}.`,
});

const task = requiredString("Task")
  .trim()
  .min(1, "Task is required.")
  .max(200, "Task must be at most 200 characters.");

/**
 * `assignee` is deliberately not accepted from the client — the controller
 * sets it from the authenticated user, otherwise anyone could create tasks
 * under someone else's name.
 */
const createTaskSchema = z.object({
  task,
  status: status.optional(),
});

const updateTaskSchema = z
  .object({ task, status })
  .partial()
  .refine((body) => Object.keys(body).length > 0, {
    error: "Provide at least one field to update.",
  });

const taskIdParamSchema = z.object({ id: objectId });

const listTasksQuerySchema = z.object({ status: status.optional() });

module.exports = {
  createTaskSchema,
  updateTaskSchema,
  taskIdParamSchema,
  listTasksQuerySchema,
};

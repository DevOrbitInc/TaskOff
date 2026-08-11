const Task = require("../models/Task");
const ApiError = require("../utils/ApiError");

// GET /api/tasks
async function getTasks(req, res, next) {
  try {
    const { status, assignee } = req.validated.query;

    const filter = {};

    if (status) {
      filter.status = status;
    }

    if (assignee) {
      filter.assignee = assignee;
    }

    const tasks = await Task.find(filter)
      .populate("assignee", "fullName")
      .sort({ createdAt: -1 });

    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
}

// POST /api/tasks
async function createTask(req, res, next) {
  try {
    const { title, description, status, tag, assignee } = req.body;

    const lastTask = await Task.findOne().sort({ taskNumber: -1 });
    const taskNumber = lastTask ? lastTask.taskNumber + 1 : 1;

    const task = await Task.create({
      taskNumber,
      title,
      description,
      status,
      tag,
      assignee: assignee || null,
    });

    await task.populate("assignee", "fullName");

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
}

// GET /api/tasks/:id
async function getTask(req, res, next) {
  try {
    const { id } = req.validated.params;

    const task = await Task.findById(id).populate("assignee", "fullName");

    if (!task) {
      return next(ApiError.notFound("Task not found"));
    }

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
}

// PUT /api/tasks/:id
async function updateTask(req, res, next) {
  try {
    const { id } = req.validated.params;

    const task = await Task.findByIdAndUpdate(id, req.validated.body, {
      new: true,
      runValidators: true,
    }).populate("assignee", "fullName");

    if (!task) {
      return next(ApiError.notFound("Task not found"));
    }

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
}

// DELETE /api/tasks/:id
async function deleteTask(req, res, next) {
  try {
    const { id } = req.validated.params;

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return next(ApiError.notFound("Task not found"));
    }

    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};

const express = require("express");
const {getTasks, createTask, getTask, updateTask, deleteTask,}= require("../controllers/taskController");

const {protect}= require("../middleware/authMiddleware");
const validate=require("../middleware/validate");

const { createTaskSchema, updateTaskSchema, taskIdParamSchema, listTasksQuerySchema} = require("../validators/task.validator");

const router = express.Router();

router.use(protect);

router.get("/", validate({query: listTasksQuerySchema}), getTasks,);

router.post("/", validate({body: createTaskSchema}), createTask,);

router.put("/:id", validate({ params: taskIdParamSchema, body: updateTaskSchema, }), updateTask,);

router.get("/:id", validate({ params: taskIdParamSchema }), getTask,);

router.delete("/:id", validate({ params: taskIdParamSchema }), deleteTask,);
module.exports = router;
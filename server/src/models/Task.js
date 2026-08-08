const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 120,
    },

    description: {
      type: String,
      required: false,
      trim: true,
    },

    status: {
      type: String,
      enum: ["To do", "In progress", "In review", "Done"],
      default: "To do",
    },

    tag: {
      type: String,
      enum: ["frontend", "backend", "auth", "mobile", "docs"],
      required: false,
    },

    assignee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Task", taskSchema);

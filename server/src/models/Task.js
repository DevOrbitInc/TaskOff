const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["To Do", "In Progress", "Done"],
      default: "To Do",
    },

    tag: {
      type: String,
      enum: ["Bug", "Feature", "Improvement"],
      default: "Feature",
    },

    assignee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Task", taskSchema);

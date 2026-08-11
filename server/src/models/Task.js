const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    taskNumber: {
      type: Number,
      required: true,
      unique: true,
    },

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
      enum: ["Todo", "In Progress", "In Review", "Done"],
      default: "Todo",
    },

    tag: {
      type: String,
      trim: true,
      maxlength: 50,
      default: null,
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

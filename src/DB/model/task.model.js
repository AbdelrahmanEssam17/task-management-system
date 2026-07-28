import mongoose, { Schema, model } from "mongoose";

const taskStatus = {
  TODO: "To Do",
  IN_PROGRESS: "In Progress",
  DONE: "Done",
};

const taskPriority = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
};

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    status: {
      type: String,
      enum: Object.values(taskStatus),
      default: taskStatus.TODO,
    },

    priority: {
      type: String,
      enum: Object.values(taskPriority),
      default: taskPriority.MEDIUM,
    },

    dueDate: {
      type: Date,
      required: true,
    },

    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    assignee: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const taskModel = mongoose.models.Task || model("Task", taskSchema);

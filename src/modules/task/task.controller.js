import { taskModel } from "../../DB/model/task.model.js";
import { projectModel } from "../../DB/model/project.model.js";

export const createTask = async (req, res, next) => {
  try {
    const { title, description, priority, dueDate, assignee } = req.body;

    const project = await projectModel.findOne({
      _id: req.params.projectId,
      $or: [{ owner: req.user.id }, { members: req.user.id }],
    });

    if (!project) {
      return res.status(403).json({
        success: false,
        message: "Project not found or access denied",
      });
    }

    const task = await taskModel.create({
      title,
      description,
      priority,
      dueDate,
      assignee,
      creator: req.user.id,
      project: req.params.projectId,
    });

    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

export const getTasks = async (req, res, next) => {
  try {
    const filter = {
      project: req.params.projectId,
    };

    if (req.query.status) filter.status = req.query.status;
    if (req.query.priority) filter.priority = req.query.priority;
    if (req.query.assignee) filter.assignee = req.query.assignee;

    const tasks = await taskModel
      .find(filter)
      .populate("creator", "username email")
      .populate("assignee", "username email");

    return res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const getTask = async (req, res, next) => {
  try {
    const task = await taskModel.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const task = await taskModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const task = await taskModel.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

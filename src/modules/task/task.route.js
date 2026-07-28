import express from "express";
import * as task from "./task.controller.js";
import validation from "../../middleware/validation.js";
import * as taskValidation from "./task.validation.js";
import { auth as verifyToken } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.post(
  "/projects/:projectId/tasks",
  verifyToken,
  validation(taskValidation.createTask),
  task.createTask,
);

router.get("/projects/:projectId/tasks", verifyToken, task.getTasks);
router.get("/:id", verifyToken, task.getTask);

router.patch(
  "/:id",
  verifyToken,
  validation(taskValidation.updateTask),
  task.updateTask,
);

router.delete("/:id", verifyToken, task.deleteTask);

export default router;

import express from "express";
import * as projectController from "./project.controller.js";
import validation from "../../middleware/validation.js";
import * as projectValidation from "./project.validation.js";
import { auth as verifyToken } from "../../middleware/auth.middleware.js";
const router = express.Router();

router.post(
  "/",
  verifyToken,
  validation(projectValidation.createProject),
  projectController.createProject,
);

router.get("/", verifyToken, projectController.getProjects);
router.get("/:id", verifyToken, projectController.getProject);
router.patch(
  "/:id",
  verifyToken,
  validation(projectValidation.updateProject),
  projectController.updateProject,
);
router.delete("/:id", verifyToken, projectController.deleteProject);

export default router;

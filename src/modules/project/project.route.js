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

export default router;

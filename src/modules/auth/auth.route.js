import express from "express";
import * as auth from "./auth.controller.js";
import validation from "../../middleware/validation.js";
import * as authValidation from "./auth.validation.js";
import { auth as verifyToken } from "../../middleware/auth.middleware.js";
const router = express.Router();
router.post("/register", validation(authValidation.register), auth.register);
router.post("/login", validation(authValidation.login), auth.login);

export default router;

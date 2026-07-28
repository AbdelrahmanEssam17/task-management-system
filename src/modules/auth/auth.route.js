import express from "express";
import * as auth from "./auth.controller.js";
import validation from "../../middleware/validation.js";
import * as authValidation from "./auth.validation.js";
import { auth as verifyToken } from "../../middleware/auth.middleware.js";
const router = express.Router();
import { emailExist } from "../../middleware/isExist.js";
router.post(
  "/register",
  emailExist,
  validation(authValidation.register),
  auth.register,
);
router.post("/login", validation(authValidation.login), auth.login);
router.patch("/update-password", verifyToken, auth.updatePassword);
router.post("/logout", verifyToken, auth.logout);
export default router;

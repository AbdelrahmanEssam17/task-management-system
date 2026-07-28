import joi from "joi";

export const register = joi.object({
  userName: joi.string().min(3).max(40).required().messages({
    "string.base": "Username must be a string",
    "string.empty": "Username is required",
    "string.min": "Username must be at least 3 characters",
    "string.max": "Username must not exceed 40 characters",
    "any.required": "Username is required",
  }),

  email: joi.string().email().required().messages({
    "string.email": "Invalid email format",
    "string.empty": "Email is required",
    "any.required": "Email is required",
  }),

  phone: joi
    .string()
    .pattern(/^01[0125][0-9]{8}$/)
    .messages({
      "string.pattern.base": "Invalid Egyptian phone number",
    }),

  password: joi.string().min(8).max(16).required().messages({
    "string.min": "Password must be at least 8 characters",
    "string.max": "Password must not exceed 16 characters",
    "any.required": "Password is required",
  }),
  gender: joi.string().valid("male", "female").default("male"),
});

export const login = joi.object({
  email: joi.string().email().required().messages({
    "string.email": "Invalid email format",
    "any.required": "Email is required",
  }),

  password: joi.string().required().messages({
    "any.required": "Password is required",
  }),
});

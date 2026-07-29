import Joi from "joi";

export const createTask = Joi.object({
  title: Joi.string().min(3).max(100).required(),

  description: Joi.string().max(500),

  priority: Joi.string().valid("Low", "Medium", "High").optional(),

  dueDate: Joi.date().required(),

  assignee: Joi.string().required(),
}).unknown(true);

export const updateTask = Joi.object({
  title: Joi.string().min(3).max(100),

  description: Joi.string().max(500),

  status: Joi.string().valid("To Do", "In Progress", "Done"),

  priority: Joi.string().valid("Low", "Medium", "High"),

  dueDate: Joi.date(),

  assignee: Joi.string(),
}).unknown(true);

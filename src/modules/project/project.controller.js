import { projectModel } from "../../DB/model/project.model.js";

export const createProject = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    const project = await projectModel.create({
      name,
      description,
      owner: req.user.id,
    });

    return res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

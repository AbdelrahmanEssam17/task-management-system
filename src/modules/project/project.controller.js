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

export const getProjects = async (req, res, next) => {
  try {
    const projects = await projectModel.find({
      $or: [{ owner: req.user.id }, { members: req.user.id }],
    });

    return res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    next(error);
  }
};

export const getProject = async (req, res, next) => {
  try {
    const project = await projectModel.findOne({
      _id: req.params.id,
      $or: [{ owner: req.user.id }, { members: req.user.id }],
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const project = await projectModel.findOne({
      _id: req.params.id,
      owner: req.user.id,
    });

    if (!project) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to update this project",
      });
    }

    const updatedProject = await projectModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      },
    );

    return res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: updatedProject,
    });
  } catch (error) {
    next(error);
  }
};
export const deleteProject = async (req, res, next) => {
  try {
    const project = await projectModel.findOne({
      _id: req.params.id,
      owner: req.user.id,
    });

    if (!project) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to delete this project",
      });
    }

    await projectModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const addMember = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const project = await projectModel.findOne({
      _id: req.params.id,
      owner: req.user.id,
    });

    if (!project) {
      return res.status(403).json({
        success: false,
        message: "Only project owner can add members",
      });
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (project.members.includes(userId)) {
      return res.status(400).json({
        success: false,
        message: "User already a member",
      });
    }

    project.members.push(userId);

    await project.save();

    return res.status(200).json({
      success: true,
      message: "Member added successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const removeMember = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const project = await projectModel.findOne({
      _id: req.params.id,
      owner: req.user.id,
    });

    if (!project) {
      return res.status(403).json({
        success: false,
        message: "Only project owner can remove members",
      });
    }

    project.members = project.members.filter(
      (member) => member.toString() !== userId,
    );
    await project.save();
    return res.status(200).json({
      success: true,
      message: "Member removed successfully",
    });
  } catch (error) {
    next(error);
  }
};

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel } from "../../DB/model/user.model.js";
export const register = async (req, res, next) => {
  const { userName, email, password, phone, gender } = req.body;
  const hashedpassword = await bcrypt.hash(password, Number(process.env.SALT));
  const user = await userModel.create({
    userName,
    email,
    password: hashedpassword,
    phone,
    gender,
  });

  return res.status(201).json({
    success: true,
    message: "User registered successfully.",
    data: {
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
        phone: user.phone,
        gender: user.gender,
      },
    },
  });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Validation error",
      errors: [
        {
          field: "email",
          message: "Email not found",
        },
      ],
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: "Validation error",
      errors: [
        {
          field: "password",
          message: "Password mismatch",
        },
      ],
    });
  }
  const accessToken = jwt.sign(
    { id: user._id, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "7d" },
  );

  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" },
  );

  return res.status(200).json({
    success: true,
    message: "Login successful",
    data: {
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
        phone: user.phone,
        gender: user.gender,
        role: user.role,
      },
      accessToken,
      refreshToken,
    },
  });
};

export const updatePassword = async (req, res, next) => {
  const userId = req.user.id;
  const { password } = req.body;
  const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT));
  const user = await userModel.findByIdAndUpdate(
    userId,
    { password: hashedPassword },
    { new: true },
  );
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Password updated successfully",
  });
};

export const logout = async (req, res, next) => {
  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

export const uploadProfileImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    const user = await userModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.profileImage = req.file.path;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile image uploaded successfully",
      data: {
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    next(error);
  }
};

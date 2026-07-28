import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

import { userModel } from "./model/user.model.js";
import { projectModel } from "./model/project.model.js";
import { taskModel } from "./model/task.model.js";

dotenv.config();

async function seedDB() {
  try {
    await mongoose.connect(process.env.DB_URI);

    console.log("Connected to MongoDB");

    await userModel.deleteMany();
    await projectModel.deleteMany();
    await taskModel.deleteMany();

    const password = await bcrypt.hash("Password123", Number(process.env.SALT));

    const users = await userModel.insertMany([
      {
        userName: "Admin",
        email: "admin@test.com",
        password,
        phone: "01012345678",
        gender: "male",
        role: "Admin",
      },
      {
        userName: "Member",
        email: "member@test.com",
        password,
        phone: "01012345679",
        gender: "female",
        role: "Member",
      },
    ]);

    console.log("Users created");

    const project = await projectModel.create({
      name: "Task Management System",
      description: "Demo project",
      owner: users[0]._id,
      members: [users[1]._id],
    });

    console.log("Project created");

    await taskModel.create({
      title: "Create Authentication",
      description: "Implement JWT authentication",
      status: "To Do",
      priority: "High",
      dueDate: new Date("2026-12-31"),
      creator: users[0]._id,
      assignee: users[1]._id,
      project: project._id,
    });

    console.log("Task created");

    await mongoose.connection.close();

    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
}

seedDB();

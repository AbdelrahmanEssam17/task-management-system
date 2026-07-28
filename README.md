# Task Management System API

A production-minded task management backend built using **Node.js, Express.js, and MongoDB**.

The system allows authenticated users to create projects, manage tasks, assign tasks to users, and track task status with role-based authorization.

---

# Features

## Authentication & Users

- User registration
- User login
- JWT authentication
- Secure password hashing
- Email verification using OTP
- Resend OTP
- Profile image upload
- Role-based access control

Roles:

- Admin
- Member

---

## Projects

- Create project
- Get accessible projects
- Get project by ID
- Update project
- Delete project
- Add project members
- Remove project members

---

## Tasks

- Create task
- Get tasks
- Get task by ID
- Update task
- Delete task
- Assign tasks to users
- Task status management

Supported statuses:

- To Do
- In Progress
- Done

Supported priorities:

- Low
- Medium
- High

---

## Task Filtering & Pagination

Tasks support filtering by:

- Status
- Priority
- Assignee

Example:

```
GET /projects/:projectId/tasks?status=Done
```

Pagination:

```
GET /projects/:projectId/tasks?page=1
```

Each page returns 10 tasks.

---

# Technology Stack

## Backend

- Node.js
- Express.js

## Database

- MongoDB
- Mongoose

## Authentication

- JWT
- bcrypt

## Validation

- Joi

## Testing

- Jest
- Supertest

## File Upload

- Multer

---

# Project Structure

```
src
│
├── modules
│   │
│   ├── auth
│   │   ├── auth.controller.js
│   │   ├── auth.route.js
│   │   ├── auth.validation.js
│   │
│   ├── project
│   │   ├── project.controller.js
│   │   ├── project.route.js
│   │   ├── project.validation.js
│   │
│   └── task
│       ├── task.controller.js
│       ├── task.route.js
│       ├── task.validation.js
│
├── middleware
│
├── DB
│   ├── model
│   └── seed.js
│
├── utils
│
└── index.js
```

---

# Installation

Clone repository:

```bash
git clone https://github.com/username/task-management-system.git
```

Go to project folder:

```bash
cd task-management-system
```

Install dependencies:

```bash
npm install
```

---

# Environment Variables

Create a `.env` file.

Example:

```
PORT=4000

DB_URI=mongodb://localhost:27017/task-management

ACCESS_TOKEN_SECRET=your_secret

REFRESH_TOKEN_SECRET=your_secret

EMAIL_USER=your_email

EMAIL_PASSWORD=your_password
```

---

Create `.env.example`:

```
PORT=

DB_URI=

ACCESS_TOKEN_SECRET=

REFRESH_TOKEN_SECRET=

EMAIL_USER=

EMAIL_PASSWORD=
```

Do not add real secrets.

---

# Database Setup

Make sure MongoDB is running.

Example:

```
mongodb://localhost:27017/task-management
```

Run seed data:

```bash
npm run seed
```

---

# Run Application

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

Server:

```
http://localhost:4000
```

---

# API Documentation
# Task Management System API Documentation

## Base URL

```
http://localhost:4000
```

---

# Authentication

Protected routes require JWT token.

Headers:

```
Authorization: Bearer <access_token>
```

---

# Authentication APIs

---

## 1. Register User

### Endpoint

```
POST /auth/register
```

### Description

Create a new user account and send verification OTP.

### Request Body

```json
{
  "userName": "Abdelrahman",
  "email": "user@gmail.com",
  "password": "Password123",
  "phone": "01000000000",
  "gender": "male"
}
```

### Response

Status: `201 Created`

```json
{
  "success": true,
  "message": "User registered successfully"
}
```

---

## 2. Verify Email

### Endpoint

```
POST /auth/verify-email
```

### Description

Verify user email using OTP.

### Request Body

```json
{
  "email": "user@gmail.com",
  "otp": "123456"
}
```

### Response

Status: `200 OK`

```json
{
  "success": true,
  "message": "Email verified successfully"
}
```

---

## 3. Resend OTP

### Endpoint

```
POST /auth/resend-otp
```

### Description

Generate and send a new verification OTP.

### Request Body

```json
{
  "email": "user@gmail.com"
}
```

### Response

```json
{
  "success": true,
  "message": "OTP sent successfully"
}
```

---

## 4. Login User

### Endpoint

```
POST /auth/login
```

### Request Body

```json
{
  "email": "user@gmail.com",
  "password": "Password123"
}
```

### Response

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "accessToken": "jwt_token",
    "refreshToken": "jwt_token"
  }
}
```

---

## 5. Upload Profile Image

### Endpoint

```
PATCH /auth/profile-image
```

### Headers

```
Authorization: Bearer <access_token>
```

### Body

Form-data:

```
image : File
```

### Response

```json
{
  "success": true,
  "message": "Profile image uploaded successfully"
}
```

---

# Project APIs

All project APIs require authentication.

---

## 1. Create Project

### Endpoint

```
POST /projects
```

### Request Body

```json
{
  "name": "Task Management System",
  "description": "Backend project management system"
}
```

### Response

```json
{
  "success": true,
  "message": "Project created successfully",
  "data": {
    "_id": "project_id",
    "name": "Task Management System"
  }
}
```

---

## 2. Get Projects

### Endpoint

```
GET /projects
```

### Description

Returns projects accessible by authenticated user.

### Response

```json
{
  "success": true,
  "data": [
    {
      "_id": "project_id",
      "name": "Project Name"
    }
  ]
}
```

---

## 3. Get Project By ID

### Endpoint

```
GET /projects/:id
```

Example:

```
GET /projects/65abc123
```

---

## 4. Update Project

### Endpoint

```
PATCH /projects/:id
```

### Request Body

```json
{
  "name": "Updated Project",
  "description": "Updated description"
}
```

---

## 5. Delete Project

### Endpoint

```
DELETE /projects/:id
```

---

## 6. Add Member To Project

### Endpoint

```
POST /projects/:id/members
```

### Permission

Admin only.

### Request Body

```json
{
  "userId": "user_id"
}
```

### Response

```json
{
  "success": true,
  "message": "Member added successfully"
}
```

---

## 7. Remove Member From Project

### Endpoint

```
DELETE /projects/:id/members/:userId
```

### Permission

Admin only.

---

# Task APIs

---

## 1. Create Task

### Endpoint

```
POST /projects/:projectId/tasks
```

### Request Body

```json
{
  "title": "Implement Authentication",
  "description": "Create JWT authentication",
  "priority": "High",
  "dueDate": "2026-08-01",
  "assignee": "user_id"
}
```

### Response

```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "_id": "task_id",
    "title": "Implement Authentication"
  }
}
```

---

## 2. Get Tasks

### Endpoint

```
GET /projects/:projectId/tasks
```

### Description

Get tasks inside a project.

---

## Filtering

Filter by status:

```
GET /projects/:projectId/tasks?status=Done
```

Filter by priority:

```
GET /projects/:projectId/tasks?priority=High
```

Filter by assignee:

```
GET /projects/:projectId/tasks?assignee=user_id
```

---

## Pagination

Each page contains 10 tasks.

Example:

```
GET /projects/:projectId/tasks?page=1
```

Response example:

```json
{
  "success": true,
  "page": 1,
  "limit": 10,
  "data": []
}
```

---

## 3. Get Task By ID

### Endpoint

```
GET /tasks/:id
```

---

## 4. Update Task

### Endpoint

```
PATCH /tasks/:id
```

### Request Body

Example:

```json
{
  "status": "Done",
  "priority": "Medium"
}
```

Supported status:

```
To Do
In Progress
Done
```

Supported priority:

```
Low
Medium
High
```

---

## 5. Delete Task

### Endpoint

```
DELETE /tasks/:id
```

---

# Error Response

All errors follow this format:

```json
{
  "success": false,
  "message": "Error message"
}
```

---

# User Roles

## Admin

Permissions:

- Add project members
- Remove project members
- Manage owned projects


## Member

Permissions:

- Access assigned projects
- Create and manage allowed tasks

---

# Test Accounts

After running seed:

## Admin

```
Email:
admin@test.com

Password:
Admin123
```

Role:

```
Admin
```

---

## Member

```
Email:
member@test.com

Password:
Member123
```

Role:

```
Member
```

---

# Automated Tests

Run:

```
npm test
```

Implemented tests:

- Register user
- Login user
- Wrong password rejected
- Create project
- Unauthorized request rejected

---

# Environment Variables

Example `.env.example`

```
PORT=4000

DB_URI=mongodb://localhost:27017/task-management

ACCESS_TOKEN_SECRET=

REFRESH_TOKEN_SECRET=

EMAIL_USER=

EMAIL_PASSWORD=
```

```
API_DOCUMENTATION.md
```

Includes:

- Authentication APIs
- Project APIs
- Task APIs
- Request examples
- Response examples
- Required headers

---

# Authentication Header

Protected routes require:

```
Authorization: Bearer ACCESS_TOKEN
```

---

# Seed Accounts

Run:

```bash
npm run seed
```

## Admin Account

```
Email:
admin@test.com

Password:
Admin123
```

Role:

```
Admin
```

---

## Member Account

```
Email:
member@test.com

Password:
Member123
```

Role:

```
Member
```

---

# Automated Tests

Implemented backend tests:

✓ Register user

✓ Login user

✓ Reject wrong password

✓ Create project

✓ Reject unauthorized request


Run tests:

```bash
npm test
```

---

# API Endpoints

## Authentication

```
POST   /auth/register

POST   /auth/login

POST   /auth/verify-email

POST   /auth/resend-otp

PATCH  /auth/profile-image
```

---

## Projects

```
POST    /projects

GET     /projects

GET     /projects/:id

PATCH   /projects/:id

DELETE  /projects/:id

POST    /projects/:id/members

DELETE  /projects/:id/members/:userId
```

---

## Tasks

```
POST    /projects/:projectId/tasks

GET     /projects/:projectId/tasks

GET     /tasks/:id

PATCH   /tasks/:id

DELETE  /tasks/:id
```

---

# Error Response Format

All errors follow:

```json
{
  "success": false,
  "message": "Error message"
}
```

---

# Security

Implemented:

- Password hashing
- JWT authentication
- Protected routes
- Role authorization
- Request validation
- Environment variables
- Centralized error handling

---

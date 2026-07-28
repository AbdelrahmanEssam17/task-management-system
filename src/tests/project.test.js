import request from "supertest";
import app from "../../app.js";

let token;

beforeAll(async () => {
  const response = await request(app).post("/auth/login").send({
    email: "admin@test.com",
    password: "Password123",
  });

  token = response.body.data.accessToken;
});

describe("Project API", () => {
  test("POST /projects - should create project", async () => {
    const response = await request(app)
      .post("/projects")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Test Project",
        description: "Project testing",
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);
  });

  test("GET /projects without token should return 401", async () => {
    const response = await request(app).get("/projects");

    expect(response.statusCode).toBe(401);
  });
});

import request from "supertest";
import app from "../app.js";

describe("Authentication API", () => {

  test("POST /auth/register - should register user", async () => {

    const response = await request(app)
      .post("/auth/register")
      .send({
        userName: "Test User",
        email: "testuser@gmail.com",
        password: "Password123",
        confirmPassword: "Password123",
        phone: "01012345678",
        gender: "male",
      });


    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);

  });



  test("POST /auth/login - should login user", async () => {

    const response = await request(app)
      .post("/auth/login")
      .send({
        email: "testuser@gmail.com",
        password: "Password123",
      });


    expect(response.statusCode).toBe(200);
    expect(response.body.data.accessToken).toBeDefined();

  });



  test("POST /auth/login - wrong password should fail", async () => {

    const response = await request(app)
      .post("/auth/login")
      .send({
        email: "testuser@gmail.com",
        password: "WrongPassword123",
      });


    expect(response.statusCode).toBe(401);
    expect(response.body.success).toBe(false);

  });

});
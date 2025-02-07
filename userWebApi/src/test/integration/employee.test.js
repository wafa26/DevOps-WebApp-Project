const request = require("supertest");
const app = require("../../app");
const mongoose = require("mongoose");

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Employee API", () => {
  it("should create an employee", async () => {
    const res = await request(app).post("/api/employees").send({
      firstName: "John",
      lastName: "Doe",
      dateOfBirth: "1990-01-01",
      placeOfBirth: "Paris",
      position: "Developer",
      salary: 50000,
    });

    expect(res.statusCode).toBe(201);
  });
});

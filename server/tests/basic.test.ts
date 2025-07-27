import request from "supertest";
import app from "../src/app";

describe("Basic App Test", () => {
  it("should return 200 and a message for GET /", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty(
      "message",
      "Application is up and running."
    );
  });

  it("should return 404 for unknown route", async () => {
    const res = await request(app).get("/unknown-route");
    expect(res.status).toBe(404);
  });

  it("should return 400 for signup with missing fields", async () => {
    const res = await request(app).post("/api/v1/user/signup").send({});
    expect(res.status).toBeGreaterThanOrEqual(400);
    expect(res.status).toBeLessThan(500);
  });

  it("should return 400 for login with missing fields", async () => {
    const res = await request(app).post("/api/v1/user/login").send({});
    expect(res.status).toBeGreaterThanOrEqual(400);
    expect(res.status).toBeLessThan(500);
  });
});

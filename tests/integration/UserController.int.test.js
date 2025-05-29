require("../setupTestDB");
const request = require("supertest");
const app = require("../../app");
const User = require("../../models/User.model");
const bcrypt = require("bcryptjs");

describe("User Controller - Integration Tests", () => {
    describe("POST/api/user/signup", () => {
        it("should return 201 and create user", async () => {
        const res = await request(app)
        .post("/api/user/signup")
        .send({ name: "Test", email: "test@example.com", password: "123456" });

        expect(res.statusCode).toBe(201);
        expect(res.body.success).toBe(true);
        const user = await User.findOne({ email: "test@example.com" });
        expect(user).not.toBeNull();
  });

        it("should not allow duplicate email registration", async () => {
            await User.create({
            name: "Jane",
            email: "jane@example.com",
            password: "hashedpass",
            });

            const res = await request(app).post("/api/user/signup").send({
            name: "Jane",
            email: "jane@example.com",
            password: "password",
            });

            expect(res.statusCode).toBe(400);
            expect(res.body.success).toBe(false);
            expect(res.body.message).toBe("User already exists");
  });
});

describe("POST /api/user/emailAuth", () => {
    it("should confirm email if user exists", async () => {
      await User.create({
        name: "Mark",
        email: "mark@example.com",
        password: "Hash@123",
      });

      const res = await request(app).post("/api/user/emailAuth").send({
        email: "mark@example.com",
      });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
    });

    it("should return 404 if email not registered", async () => {
      const res = await request(app).post("/api/user/emailAuth").send({
        email: "nonexistent@example.com",
      });

      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });

  describe("POST /api/user/passwordAuth", () => {
    it("should authenticate valid credentials", async () => {
      
      const hashed = await bcrypt.hash("secret", 10);

      await User.create({
        name: "Alice",
        email: "alice@example.com",
        password: hashed,
      });

      const res = await request(app).post("/api/user/passwordAuth").send({
        email: "alice@example.com",
        password: "secret",
      });

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
    });

    it("should reject wrong password", async () => {
        const hashed = await bcrypt.hash("rightpass", 10);
  
        await User.create({
          name: "Bob",
          email: "bob@example.com",
          password: hashed,
        });
  
        const res = await request(app).post("/api/user/passwordAuth").send({
          email: "bob@example.com",
          password: "wrongpass",
        });
  
        expect(res.statusCode).toBe(400);
        expect(res.body.success).toBe(false);
      });

      it("should return 404 if email not found", async () => {
        const res = await request(app).post("/api/user/passwordAuth").send({
          email: "ghost@example.com",
          password: "doesntmatter",
        });
  
        expect(res.statusCode).toBe(404);
        expect(res.body.error).toBe("Email not found. User not registered");
      });

      describe("POST /api/user/logout", () => {
        it("should logout user successfully", async () => {
          const res = await request(app).post("/api/user/logout");
          expect(res.statusCode).toBe(200);
          expect(res.body.message).toBe("Logged out successfully");
        });
      });
})
});
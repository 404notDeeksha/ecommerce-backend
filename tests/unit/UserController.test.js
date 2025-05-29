const {
  signupUser,
  verifyEmail,
  verifyPassword,
  logoutUser,
} = require("../../controllers/User.controller");

const User = require("../../models/User.model");
const bcrypt = require("bcryptjs");

jest.mock("../../models/User.model");
jest.mock("bcryptjs");

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("User Controller - Unit Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("signupUser", () => {
    it("should return 400 if user already exists", async () => {
      const req = {
        body: {
          name: "A",
          email: "a@test.com",
          password: "123",
        },
      };
      const res = mockRes();

      User.findOne.mockResolvedValue(true); //-fake that user exists already

      await signupUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "User already exists",
      });
    });

    it("should create a new user", async () => {
      const req = {
        body: {
          name: "B",
          email: "b@test.com",
          password: "pass",
        },
      };
      const res = mockRes();

      User.findOne.mockResolvedValue(null);
      bcrypt.genSalt.mockResolvedValue("salt");
      bcrypt.hash.mockResolvedValue("hashed");

      User.create.mockResolvedValue({
        userId: "abc123",
        name: "B",
        email: "b@test.com",
        save: jest.fn(),
      });

      await signupUser(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          message: "User registered successfully",
          data: expect.objectContaining({ name: "B", email: "b@test.com" }),
        })
      );
    });
  });

  describe("verifyEmail", () => {
    it("should return 400 if email not provided", async () => {
      const req = { body: {} };
      const res = mockRes();

      await verifyEmail(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Email is required",
      });
    });

    it("should return 200 if user found", async () => {
      const req = { body: { email: "c@test.com" } };
      const res = mockRes();

      User.findOne.mockResolvedValue({ email: "c@test.com" });

      await verifyEmail(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ success: true })
      );
    });

    it("should return 404 if user not found", async () => {
      const req = { body: { email: "d@test.com" } };
      const res = mockRes();

      User.findOne.mockResolvedValue(null);

      await verifyEmail(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "User not registered. Please sign up.",
      });
    });
  });

  describe("verifyPassword", () => {
    it("should return 404 if user not found", async () => {
      const req = { body: { email: "x@test.com", password: "123" } };
      const res = mockRes();

      User.findOne.mockResolvedValue(null);

      await verifyPassword(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: "Email not found. User not registered",
      });
    });

    it("should return 400 if password does not match", async () => {
      const req = { body: { email: "y@test.com", password: "wrong" } };
      const res = mockRes();

      User.findOne.mockResolvedValue({ password: "hashed" });
      bcrypt.compare.mockResolvedValue(false);

      await verifyPassword(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: "Invalid credentials",
      });
    });

    it("should return 201 if login successful", async () => {
      const req = { body: { email: "z@test.com", password: "right" } };
      const res = mockRes();

      User.findOne.mockResolvedValue({
        userId: "z123",
        name: "Z",
        email: "z@test.com",
        password: "hashed",
      });
      bcrypt.compare.mockResolvedValue(true);

      await verifyPassword(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ success: true })
      );
    });
  });

  describe("logoutUser", () => {
    it("should return 200 on logout", () => {
      const req = {};
      const res = mockRes();

      logoutUser(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: "Logged out successfully",
      });
    });
  });
});

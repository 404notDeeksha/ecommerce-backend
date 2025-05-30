const mongoose = require("mongoose");
const dbConnection = require("../../config/dbConnection"); // adjust path
jest.mock("mongoose");

describe("dbConnection", () => {
  const logSpy = jest.spyOn(console, "log").mockImplementation();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should log success message if connection succeeds", async () => {
    mongoose.connect.mockResolvedValue();

    await dbConnection();

    expect(mongoose.connect).toHaveBeenCalledWith(expect.any(String));
    expect(logSpy).toHaveBeenCalledWith("MongoDB connection successful!");
  });

  it("should log error message if connection fails", async () => {
    const error = new Error("connection failed");
    mongoose.connect.mockRejectedValue(error);

    await dbConnection();

    expect(logSpy).toHaveBeenCalledWith("MongoDB connection failed:", error);
  });
});

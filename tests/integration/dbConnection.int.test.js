const mongoose = require("mongoose");
const dbConnection = require("../../config/dbConnection");

describe("MongoDB Integration", () => {
  beforeAll(async () => {
    await dbConnection(); // should use a real/test DB URL
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should connect to MongoDB successfully", () => {
    expect(mongoose.connection.readyState).toBe(1); // 1 = connected
  });
});

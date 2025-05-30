
// describe("Environment Variable Validation", () => {
//     const originalEnv = process.env;
  
//     beforeEach(() => {
//       jest.resetModules(); // clear cached envValidator module
//       process.env = { ...originalEnv }; // clone original env
//     });
  
//     afterEach(() => {
//       process.env = originalEnv; // restore original env
//     });
  
//     it("should throw an error and exit when required env vars are missing", () => {
//       delete process.env.PORT;
//       delete process.env.MONGODB_URL;
//       process.env.NODE_ENV = "development";
  
//       const exitMock = jest.spyOn(process, "exit").mockImplementation(() => {});
//       const errorMock = jest.spyOn(console, "error").mockImplementation(() => {});
  
//       require("../../config/envValidator");
  
//       expect(exitMock).toHaveBeenCalledWith(1);
//       expect(errorMock).toHaveBeenCalledWith(
//         expect.stringContaining("Missing environment variables")
//       );
  
//       exitMock.mockRestore();
//       errorMock.mockRestore();
//     });
  
//     it("should log success when all required env vars are present", () => {
//       process.env.PORT = "8001";
//       process.env.MONGODB_URL = "mongodb://localhost:27017/test";
//       process.env.DEP_FRONTEND_URL = "http://localhost:3000";
//       process.env.DEV_FRONTEND_URL = "http://localhost:3001";
//       process.env.NODE_ENV = "development";
  
//       const logMock = jest.spyOn(console, "log").mockImplementation(() => {});
//       require("../../config/envValidator");
  
//       expect(logMock).toHaveBeenCalledWith(
//         expect.stringContaining("All required environment variables are set.")
//       );
  
//       logMock.mockRestore();
//     });
//   });
  
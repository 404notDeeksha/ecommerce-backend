// describe("App Startup Integration", () => {
//   const originalEnv = process.env;

//   beforeEach(() => {
//     jest.resetModules();
//     process.env = { ...originalEnv };
//   });

//   afterEach(() => {
//     process.env = originalEnv;
//   });

//   it("should exit process if required env vars are missing", () => {
//     delete process.env.PORT;
//     delete process.env.MONGODB_URL;
//     process.env.NODE_ENV = "production";

//     const exitMock = jest.spyOn(process, "exit").mockImplementation(() => {});
//     require("../../index"); // or wherever app startup begins

//     expect(exitMock).toHaveBeenCalledWith(1);
//     exitMock.mockRestore();
//   });
// });

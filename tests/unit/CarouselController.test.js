const { getCarousel } = require("../../controllers/Carousel.controller");
const Carousel = require("../../models/Carousel.model");

jest.mock("../../models/Carousel.model");

const mockRes = () => {
  const res = {};
  res.json = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  return res;
};

describe("getCarousel - Unit Test", () => {
  it("should return carousel data", async () => {
    const req = {};
    const res = mockRes();

    const fakeCarousel = [{ title: "Banner 1" }, { title: "Banner 2" }];
    Carousel.find.mockResolvedValue(fakeCarousel);

    await getCarousel(req, res);

    expect(res.json).toHaveBeenCalledWith({ success: true, data: fakeCarousel });
  });

  it("should handle errors", async () => {
    const req = {};
    const res = mockRes();

    Carousel.find.mockRejectedValue(new Error("DB error"));

    await getCarousel(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ success: false, message: "DB error" });
  });
});

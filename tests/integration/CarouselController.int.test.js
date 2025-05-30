const request = require("supertest");
const app = require("../../app");
const Carousel = require("../../models/Carousel.model");
require("../setupTestDB");

describe("GET /api/carousel/featured", () => {
  it("should return carousel items", async () => {
    await Carousel.create([
        {
            category_id: "electronics",
            display_type: "banner",
            category_image_address: "https://example.com/electronics.jpg",
          },
          {
            category_id: "fashion",
            display_type: "slider",
            category_image_address: "https://example.com/fashion.jpg",
          },
    ]);

    const res = await request(app).get("/api/carousel/featured");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBe(2);
    expect(res.body.data[0]).toHaveProperty("category_id");
    expect(res.body.data[0]).toHaveProperty("display_type");
    expect(res.body.data[0]).toHaveProperty("category_image_address");
  });

  it("should return empty array if no carousel items exist", async () => {
    const res = await request(app).get("/api/carousel/featured");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toEqual([]);
  });
});

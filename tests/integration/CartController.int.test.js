const request = require("supertest");
const app = require("../../app");
require("../setupTestDB");

describe("Cart Integration Tests", () => {
  const userId = "test-user-123";
  const product = {
    productId: "p1",
    productName: "Test Product",
    price: 100,
    quantity: 2,
  };

  describe("POST /api/cart", () => {
    it("should add items to a new cart", async () => {
      const res = await request(app)
        .post("/api/cart")
        .send({
          userId,
          items: [product],
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.items[0].productId).toBe("p1");
    });

    it("should update existing cart", async () => {
      await request(app)
        .post("/api/cart")
        .send({
          userId,
          items: [product],
        });

      const updated = {
        productId: "p1",
        productName: "Test Product",
        price: 100,
        quantity: 5,
      };

      const res = await request(app)
        .post("/api/cart")
        .send({
          userId,
          items: [updated],
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.data.items[0].quantity).toBe(5);
    });
  });

  describe("PUT /api/cart", () => {
    it("should update item quantity", async () => {
      await request(app)
        .post("/api/cart")
        .send({
          userId,
          items: [product],
        });

      const res = await request(app).put(`/api/cart/${userId}/p1/4`);

      expect(res.statusCode).toBe(200);
      expect(res.body.data.items[0].quantity).toBe(4);
    });
  });

  describe("GET /api/cart/:userId", () => {
    it("should return cart", async () => {
      await request(app)
        .post("/api/cart")
        .send({
          userId,
          items: [product],
        });

      const res = await request(app).get(`/api/cart/${userId}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.data.userId).toBe(userId);
    });
  });

  describe("GET /api/cart/quantity/:userId", () => {
    it("should return total quantity", async () => {
      await request(app)
        .post("/api/cart")
        .send({
          userId,
          items: [
            { ...product, quantity: 1 },
            { ...product, productId: "p2", quantity: 1 },
          ],
        });

      const res = await request(app).get(`/api/cart/quantity/${userId}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.data).toBe(2);
    });
  });

  describe("DELETE /api/cart/:userId/:productId", () => {
    it("should remove item from cart", async () => {
      await request(app)
        .post("/api/cart")
        .send({
          userId,
          items: [product],
        });

      const res = await request(app).delete(
        `/api/cart/${userId}/${product.productId}`
      );

      expect(res.statusCode).toBe(200);
      expect(res.body.data.items.length).toBe(0);
    });
  });
});

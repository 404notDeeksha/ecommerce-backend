const request = require('supertest');
const app = require("../../app");
const Product = require("../../models/Products.model");
require("../setupTestDB");

const mockProduct = {
    productId: "P1001",
    productName: "Sample Phone",
    productDescription: "A great phone with excellent features",
    price: 999,
    brand: "MockBrand",
    modelName: "X1",
    colour: "Black",
    itemDimensions: "10x5x1",
    images: ["url1", "url2"],
    weight: "200g",
    material: "Aluminum",
    warranty: "1 year",
    stockAvailability: true,
    rating: 4.5,
    aboutThisItem: ["Fast", "Reliable", "Lightweight"],
    discount: 10,
    category: "Electronics",
    subCategory: "Mobiles",
    bestseller: true,
    items: [
      {
        itemId: "I1001",
        colour: "Black",
        size: null,
        price: 999,
        stockAvailability: true,
      },
    ],
  };
  
  describe("GET /api/products", () => {
    it("should return all products without filters", async () => {
      await Product.create(mockProduct);
  
      const res = await request(app).get("/api/products");
  
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].productName).toBe("Sample Phone");
    });
  
    it("should return filtered products by category", async () => {
      await Product.create(mockProduct);
  
      const res = await request(app).get("/api/products").query({ category: "Electronics" });
  
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveLength(1);
    });
  
    it("should return empty data for non-matching filters", async () => {
      await Product.create(mockProduct);
  
      const res = await request(app).get("/api/products").query({ category: "Toys" });
  
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(false);
      expect(res.body.data).toHaveLength(0);
    });
  });
  
  describe("GET /api/products/product/:id", () => {
    it("should return a product by id", async () => {
      await Product.create(mockProduct);
  
      const res = await request(app).get("/api/products/product/P1001");
  
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.productId).toBe("P1001");
    });
  
    it("should return 404 if product not found", async () => {
      const res = await request(app).get("/api/products/product/unknownId");
  
      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe("Product Not Found!");
    });
  });
  
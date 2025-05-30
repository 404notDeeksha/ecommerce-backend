const { getAllProducts, getSingleProduct } = require("../../controllers/Products.controller");
const Products = require("../../models/Products.model");

jest.mock("../../models/Products.model");

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("Product Controller - Unit Tests", () => {

  describe("getAllProducts", () => {
    it("should return filtered products", async () => {
      const req = {
        query: {
          category: "electronics",
          brand: "Samsung,Sony",
          minPrice: "100",
          maxPrice: "500",
        },
      };

      const res = mockRes();
      const mockProducts = [{ name: "TV", price: 400 }];

      Products.find.mockResolvedValue(mockProducts);

      await getAllProducts(req, res);

      expect(Products.find).toHaveBeenCalledWith({
        category: "electronics",
        brand: { $in: ["Samsung", "Sony"] },
        Price: { $gte: 100, $lte: 500 },
      });
      expect(res.send).toHaveBeenCalledWith({
        success: true,
        data: mockProducts,
      });
    });

    it("should return message if no products found", async () => {
      const req = { query: {} };
      const res = mockRes();

      Products.find.mockResolvedValue([]);

      await getAllProducts(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "No products found matching the filters.",
        data: [],
      });
    });

    it("should handle errors", async () => {
      const req = { query: {} };
      const res = mockRes();

      Products.find.mockRejectedValue(new Error("DB error"));

      await getAllProducts(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Internal Server Error",
      });
    });
  });

  describe("getSingleProduct", () => {

    it("should return product for given id", async () => {
      const req = { params: { id: "123" } };
      const res = mockRes();
      const product = { productId: "123", name: "Phone" };

      Products.findOne.mockResolvedValue(product);

      await getSingleProduct(req, res);

      expect(Products.findOne).toHaveBeenCalledWith({ productId: "123" });
      expect(res.send).toHaveBeenCalledWith({
        success: true,
        data: product,
      });
    });

    it("should return 404 if product not found", async () => {
      const req = { params: { id: "999" } };
      const res = mockRes();

      Products.findOne.mockResolvedValue(null);

      await getSingleProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Product Not Found!",
      });
    });
  });
});

const Cart = require("../../models/Cart.model");
const {
  addCartItems,
  updateCartQty,
  getCart,
  getCartQty,
  deleteCartItem,
} = require("../../controllers/Cart.controller");

jest.mock("../../models/Cart.model");

describe("Cart Controller Unit Tests", () => {
  let req, res;

  beforeEach(() => {
    req = { body: {}, params: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("addCartItems", () => {
    it("should create a new cart if none exists", async () => {
      req.body = {
        userId: "user123",
        items: [{ productId: "p1", quantity: 2, productName: "x", price: 100 }],
      };
      Cart.findOne.mockResolvedValue(null);
      Cart.prototype.save = jest.fn().mockResolvedValue({ items: req.body.items });

      await addCartItems(req, res);

      expect(Cart.findOne).toHaveBeenCalledWith({ userId: "user123" });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ success: true })
      );
    });
  });

  describe("updateCartQty", () => {
    it("should update item quantity", async () => {
      req.params = { userId: "user123", productId: "p1", quantity: "3" };
      const mockCart = {
        items: [{ productId: "p1", quantity: 1, price: 100 }],
        save: jest.fn().mockResolvedValue(true),
      };
      Cart.findOne.mockResolvedValue(mockCart);

      await updateCartQty(req, res);

      expect(mockCart.items[0].quantity).toBe("3");
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  describe("getCart", () => {
    it("should return cart if found", async () => {
      req.params = { userId: "user123" };
      Cart.findOne.mockResolvedValue({ userId: "user123", items: [] });

      await getCart(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
    });

    it("should create cart if not found", async () => {
      req.params = { userId: "user123" };
      Cart.findOne.mockResolvedValue(null);
      Cart.create = jest.fn().mockResolvedValue({ userId: "user123", items: [] });

      await getCart(req, res);

      expect(Cart.create).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  describe("getCartQty", () => {
    it("should return total quantity", async () => {
      req.params = { userId: "user123" };
      Cart.findOne.mockResolvedValue({
        items: [{ quantity: 2 }, { quantity: 3 }],
      });

      await getCartQty(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: 5,
      });
    });
  });

  describe("deleteCartItem", () => {
    it("should remove item from cart", async () => {
      req.params = { userId: "user123", productId: "p1" };
      const mockCart = {
        items: [{ productId: "p1" }, { productId: "p2" }],
        save: jest.fn().mockResolvedValue(true),
      };
      Cart.findOne.mockResolvedValue(mockCart);

      await deleteCartItem(req, res);

      expect(mockCart.items.length).toBe(1);
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });
});

require("../setupTestDB");
const Cart = require("../../models/Cart.model");

describe("Cart Model", () => {
  it("should create a cart with items & calculate total price", async () => {
    const cart = new Cart({
      userId: "123e4567-e89b-12d3-a456-426614174000",
      items: [
        {
          productId: "P001",
          productName: "T-Shirt",
          price: 500,
          quantity: 2,
        },
        {
          productId: "P002",
          productName: "Jeans",
          price: 1200,
          quantity: 1,
        },
      ],
    });

    const savedCart = await cart.save();

    expect(savedCart._id).toBeDefined();
    expect(savedCart.items.length).toBe(2);
    expect(savedCart.totalPrice).toBe(2200);


  });
});

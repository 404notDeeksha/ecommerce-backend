require("../setupTestDB");
const Product = require('../../models/Products.model');

describe("Product Model", ()=>{
    it('should create a product with required fields & nested items', async()=>{
        const product = new Product({
            productId: "PRD123",
            productName: "Smart Watch",
            productDescription: "A feature-rich smartwatch for all occasions.",
            price: 9999,
            brand: "TechWear",
            modelName: "TWX-500",
            colour: "Black",
            itemDimensions: "5x5x1 cm",
            images: ["img1.jpg", "img2.jpg"],
            weight: "50g",
            material: "Silicone",
            warranty: "1 year",
            stockAvailability: true,
            rating: 4.5,
            aboutThisItem: ["Heart Rate Monitor", "GPS", "Water Resistant"],
            discount: 10,
            category: "Wearables",
            subCategory: "Watches",
            bestseller: true,
            items: [
              {
                itemId: "ITEM001",
                colour: "Black",
                size: "M",
                price: 9999,
                stockAvailability: true,
              },
            ],
          });

          const savedProduct = await product.save();

    expect(savedProduct._id).toBeDefined();
    expect(savedProduct.productName).toBe("Smart Watch");
    expect(savedProduct.items.length).toBe(1);
    expect(savedProduct.items[0].itemId).toBe("ITEM001");
    });

it("should not allow duplicate productId", async () => {
    const productData = {
      productId: "DUPLICATE123",
      productName: "Tablet",
      productDescription: "High-res display tablet.",
      price: 15000,
      brand: "TechTab",
      modelName: "TT10",
      colour: "Gray",
      itemDimensions: "20x12x1 cm",
      images: ["tab1.jpg"],
      weight: "500g",
      material: "Plastic",
      warranty: "2 years",
      stockAvailability: true,
      rating: 4.0,
      aboutThisItem: ["Fast Processor", "Long Battery"],
      discount: 5,
      category: "Electronics",
      subCategory: "Tablets",
      bestseller: false,
      items: [
        {
          itemId: "TAB001",
          colour: "Gray",
          size: null,
          price: 15000,
          stockAvailability: true,
        },
      ],
    };

    await new Product(productData).save();

    let error;
    try {
      await new Product(productData).save(); // Duplicate
    } catch (e) {
      error = e;
    }

    expect(error).toBeDefined();
    expect(error.code).toBe(11000); // MongoDB duplicate key error
  });

  it("should fail if required field is missing", async () => {
    const incompleteProduct = new Product({
      productId: "INCOMPLETE001",
      // missing required fields like productName, brand, etc.
    });

    let error;
    try {
      await incompleteProduct.save();
    } catch (e) {
      error = e;
    }

    expect(error).toBeDefined();
    expect(error.name).toBe("ValidationError");
  });

  it("should not exceed maxlength for productDescription", async () => {
    const product = new Product({
      productId: "LONGDESC123",
      productName: "Test Product",
      productDescription: "x".repeat(101), // 101 characters
      price: 100,
      brand: "Brand",
      modelName: "Model",
      colour: "Blue",
      itemDimensions: "10x10x10",
      images: ["img.jpg"],
      weight: "100g",
      material: "Steel",
      warranty: "1 year",
      stockAvailability: true,
      rating: 4,
      aboutThisItem: ["Durable"],
      discount: 0,
      category: "Tools",
      subCategory: "Hand Tools",
      bestseller: false,
      items: [],
    });

    let error;
    try {
      await product.save();
    } catch (e) {
      error = e;
    }

    expect(error).toBeDefined();
    expect(error.errors.productDescription.kind).toBe("maxlength");
  });

})

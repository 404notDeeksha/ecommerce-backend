require("../setupTestDB");
const Carousel = require("../../models/Carousel.model");

describe("Carousel Model", () => {
    it("should require all fields", async () => {
      const carousel = new Carousel({});
      let error;
      try {
        await carousel.validate();
      } catch (e) {
        error = e;
      }
  
      expect(error.errors.category_id).toBeDefined();
      expect(error.errors.display_type).toBeDefined();
      expect(error.errors.category_image_address).toBeDefined();
    });

    it("should save a valid carousel", async () => {
        const data = {
          category_id: "5A4V7S",
          display_type: "AUTOMATIC_RUNNING_CAROUSEL",
          category_image_address: "http://example.com/image.jpg",
        };
    
        const carousel = new Carousel(data);
        const saved = await carousel.save();
    
        expect(saved._id).toBeDefined();
        expect(saved.category_id).toBe(data.category_id);
        expect(saved.display_type).toBe(data.display_type);
        expect(saved.category_image_address).toBe(data.category_image_address);
      });

      it("should not allow duplicate category_id", async () => {
        const data = {
          category_id: "5A4V7S",
          display_type: "AUTOMATIC_RUNNING_CAROUSEL",
          category_image_address: "http://example.com/fashion.jpg",
        };
    
        await Carousel.create(data);  //new entry created
    
        let error;
        try {
          await Carousel.create(data); // Duplicate
        } catch (e) {
          error = e;
        }
    
        expect(error).toBeDefined();
        expect(error.code).toBe(11000); // MongoDB duplicate key error
      });

});
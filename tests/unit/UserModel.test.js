require("../setupTestDB");
const User = require("../../models/User.model");

beforeAll(async () => {
  await User.syncIndexes(); 
});


describe('User Model', ()=>{
    it('should require name, email, and password', async () => {
        const user = new User({});
        let error;
        try{
            await user.validate();
        }catch(e){
            error=e;
        }
        expect(error.errors.name).toBeDefined();
        expect(error.errors.email).toBeDefined();
        expect(error.errors.password).toBeDefined();
})

it('should trim the name field', async () => {
    const user = new User({
      name: 'John',
      email: 'john@example.com',
      password: '123456',
    });
    await user.validate();
    expect(user.name).toBe('John');
  });

  it('should convert email to lowercase', async () => {
    const user = new User({
      name: 'John',
      email: 'JOHN@EXAMPLE.COM',
      password: '123456',
    });
    await user.validate();
    expect(user.email).toBe('john@example.com');
  });

  it('should generate userId by default', async () => {
    const user = new User({
      name: 'John',
      email: 'john@example.com',
      password: '123456',
    });
    await user.validate();
    expect(user.userId).toBeDefined();
    expect(user.userId).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    ); 
  });

  it('should fail if password is less than 6 characters', async () => {
    const user = new User({
      name: 'John',
      email: 'john@example.com',
      password: '123',
    });
    let error;
    try {
      await user.validate();
    } catch (e) {
      error = e;
    }
    expect(error.errors.password).toBeDefined();
  });

  it('should set timestamps', async () => {
    const user = new User({
      name: 'John',
      email: 'john@example.com',
      password: '123456',
    });
    await user.save();
    expect(user.createdAt).toBeDefined();
    expect(user.updatedAt).toBeDefined();
  });

  it('should not allow duplicate emails', async () => {
    const user1 = new User({
      name: 'John',
      email: 'john@example.com',
      password: '123456',
    });
    await user1.save();

    const user2 = new User({
      name: 'Jane',
      email: 'john@example.com', // same email
      password: 'abcdef',
    });
    let error;
    try {
      await user2.save();
    } catch (e) {
      error = e;
    }
    expect(error).toBeDefined();
    expect(error.code).toBe(11000); // Mongo duplicate key error
  });



});
const account = require("../models/Account.model");
const jwt = require("jsonwebtoken");

// /account/create - create user account
const createAccount = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // console.log("name", name, email, password);
    const user = await account.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      data: err.message,
    });
  }
};

// POST/account/check - check if account already registered
const checkEmail = async (req, res) => {
  const { email } = req.body;
  console.log("User's Email", email);
  const [user] = await account.find({ email: email });
  console.log("User", user);

  if (user) {
    return res.status(201).json({
      success: true,
      message: "User Already Registered. Go to signin page",
      data: user,
    });
  }
};

// POST/account/auth- signs in registered user
const authController = async (req, res) => {
  const { email, password } = req.body;
  console.log("Email auth", email);

  const [user] = await account.find({ email });
  console.log("User auth", user);

  if (!user) {
    return res
      .status(404)
      .json({ error: "Email not found. User not registered" });
  }

  if (user.password !== password) {
    return res.status(404).json({
      success: false,
      error: "Password entered is Incorrect",
    });
  }
  console.log("Verified password", password);

  const token = jwt.sign(
    { userId: user.userId, email: user.email },
    process.env.JWT_TOKEN_KEY,
    {
      expiresIn: "1h",
    }
  );
  console.log("Token", token);
  let result = {
    success: true,
    data: {
      token,
      user,
    },
  };
  return res.status(201).json({ success: true, data: result });
};

// /signin - match user credentials
const handleGetUserCredentials = async (req, res) => {
  const { email, password } = req.body;
  // console.log("name", email, password);

  const [user] = await account.find({ email: email });

  // console.log("user", user);

  if (!user) {
    return res
      .status(404)
      .json({ error: "Email not found. User not registered" });
  }

  if (user.password !== password) {
    return res.status(404).json({ error: "Password entered is Incorrect" });
  }

  let result = {
    message: "success",
    data: {
      user,
    },
  };

  return res.status(201).json(result);
};

module.exports = {
  createAccount,
  checkEmail,
  authController,
  handleGetUserCredentials,
};

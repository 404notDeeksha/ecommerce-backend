const account = require("../models/Account.model");
const jwt = require("jsonwebtoken");

// /signup - create user account
const handleCreateUser = async (req, res) => {
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
      error: err.message,
    });
  }
};

// /signin - user is registered or not
const handleGetUser = async (req, res) => {
  const { email } = req.body;
  console.log("email", email);

  const [user] = await account.find({ email });
  console.log(user);

  if (!user) {
    return res
      .status(404)
      .json({ error: "Email not found. User not registered" });
  }

  const token = jwt.sign(
    { email: user.email },
    process.env.JWT_TOKEN_KEY,
    {
      expiresIn: "1h",
    },
    (err, token) => {
      if (err) {
        console.error("Error signing the token:", err);
      } else {
        console.log("Generated Token:", token);
      }
    }
  );

  let result = {
    message: "success",
    data: {
      token,
      email: user.email,
      password: user.password,
    },
  };

  return res.status(201).json(result);
};

// /create - check if user already registered
const handleGetUserPresentAlready = async (req, res) => {
  const { email } = req.body;
  // console.log(email);

  const [user] = await account.find({ email: email });
  // console.log(user);

  if (user) {
    return res
      .status(201)
      .json({ message: "User Already Registered. Go to signin page" });
  }
  // return res.status(201).json({ result: "success" });
};

// /signin - match user credentials
const handleGetUserCredentials = async (req, res) => {
  const { email, password } = req.body;
  // console.log("name", email, password);

  const [user] = await account.find({ email: email });

  console.log("user", user);

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
  handleCreateUser,
  handleGetUserPresentAlready,
  handleGetUser,
  handleGetUserCredentials,
};

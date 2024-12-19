const dataSchema = require("../models/DataPattern");
const jwt = require("jsonwebtoken");

// /signup - create user account
const handleCreateUser = async (req, res) => {
  const { name, email, password } = req.body;
  // console.log("name", name, email, password);
  if (!name || !email || !password) {
    return res.status(404).json({ error: "Enter all required details" });
  }

  const user = await dataSchema.create({
    name,
    email,
    password,
  });

  let result = {
    message: "success",
    data: {
      user,
    },
  };

  return res.status(201).json(result);
};

// /signin - user is registered or not
const handleGetUser = async (req, res) => {
  const { email } = req.body;
  console.log("email", email);

  const [user] = await dataSchema.find({ email });
  console.log(user);

  if (!user) {
    return res
      .status(404)
      .json({ error: "Email not found. User not registered" });
  }

  const token = jwt.sign({ email: user.email }, process.env.JWT_TOKEN_KEY, {
    expiresIn: "1h",
  });

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

  const [user] = await dataSchema.find({ email: email });
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

  const [user] = await dataSchema.find({ email: email });

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

const dataSchema = require("../models/DataPattern");

// /signup
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
  // console.log("email", email);
  const user = await dataSchema.find({ email });

  if (!user) {
    return res
      .status(404)
      .json({ error: "Email not found. User not registered" });
  }

  let result = {
    message: "success",
    data: {
      user,
    },
  };

  return res.status(201).json(result);
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

module.exports = { handleCreateUser, handleGetUser, handleGetUserCredentials };

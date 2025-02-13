const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// POST api/user/signup - create user account
const signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user)
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true, // Prevent client-side JS from accessing it
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "strict", // Prevent CSRF
      maxAge: 15 * 60 * 1000, // Access token expires in 15 minutes
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: { id: user.userId, name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      data: err,
    });
  }
};

// POST api/user/emailAuth
const verifyEmail = async (req, res) => {
  try {
    const { email } = req.body;
    console.log("User's Email", email);
    const [user] = await User.find({ email: email });

    if (user) {
      return res.status(201).json({
        success: true,
        message: "User Already Registered. Go to signin page",
        data: user,
      });
    }
  } catch (err) {
    res.status(404).json({
      success: false,
      data: err,
    });
  }
};

// POST  api/user/passwordAuth
const verifyPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Email auth", email, password);

    const user = await User.findOne({ email });
    console.log("User auth", user);

    if (!user) {
      return res
        .status(404)
        .json({ error: "Email not found. User not registered" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res
        .status(400)
        .json({ success: false, error: "Invalid credentials" });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true, // Prevent client-side JS from accessing it
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "strict", // Prevent CSRF
      maxAge: 15 * 60 * 1000, // Access token expires in 15 minutes
    });

    res.status(201).json({
      success: true,
      message: "Login successful",
      user: { id: user.userId, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// POST api/user/logout
const logoutUser = (req, res) => {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (err) {
    console.log("Cookie cant be deleted", err);
  }
};

// GET api/user/refresh
const refreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  console.log("REFERSH TOKEN", refreshToken);
  if (!refreshToken) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY);

    const newAccessToken = jwt.sign(
      { userId: decoded.userId },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "15m" }
    );

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000, // Access token expires in 15 minutes
    });

    res.json({ message: "Token refreshed" });
  } catch (error) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }
};

const generateAccessToken = (user) => {
  return jwt.sign({ userId: user.userId }, process.env.JWT_ACCESS_KEY, {
    expiresIn: "15m",
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ userId: user.userId }, process.env.JWT_REFRESH_KEY, {
    expiresIn: "7d",
  });
};

module.exports = {
  signupUser,
  verifyEmail,
  verifyPassword,
  logoutUser,
  refreshToken,
};

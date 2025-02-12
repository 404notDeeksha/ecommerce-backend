const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  if (!accessToken) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized. No access token provided.",
    });
  }

  try {
    // Verify Access Token
    const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
    req.user = decoded.userId;
    return next(); // Proceed if token is valid
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      console.log("Access token expired. Checking refresh token...");

      if (!refreshToken) {
        return res.status(403).json({
          success: false,
          message: "Forbidden. No refresh token provided.",
        });
      }

      try {
        // Verify Refresh Token
        const refreshDecoded = jwt.verify(
          refreshToken,
          process.env.JWT_REFRESH_KEY
        );
        const newAccessToken = jwt.sign(
          { userId: refreshDecoded.userId },
          process.env.JWT_ACCESS_KEY,
          { expiresIn: "15m" } // Set a short expiration time
        );

        // Set the new access token in cookies
        res.cookie("accessToken", newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "Strict",
        });

        req.user = refreshDecoded.userId;
        return next(); // Continue request with refreshed token
      } catch (refreshErr) {
        console.log("Invalid refresh token", refreshErr);
        return res.status(403).json({
          success: false,
          message: "Forbidden. Invalid refresh token.",
        });
      }
    }

    return res
      .status(400)
      .json({ success: false, message: "Invalid access token.", error: err });
  }
};

module.exports = authMiddleware;

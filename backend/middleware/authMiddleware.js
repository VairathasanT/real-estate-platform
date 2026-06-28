const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    console.log("========== AUTH ==========");

    const authHeader = req.header("Authorization");

    console.log("Authorization Header:", authHeader);

    if (!authHeader) {
      console.log("No Authorization Header");
      return res.status(401).json({
        success: false,
        message: "Access Denied",
      });
    }

    const token = authHeader.replace("Bearer ", "");

    console.log("Extracted Token:", token);

    const verified = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Verified User:", verified);

    req.user = verified;

    next();
  } catch (err) {
    console.log("JWT ERROR:");
    console.log(err);

    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};

module.exports = authMiddleware;
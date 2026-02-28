require("dotenv").config();
const jwt = require("jsonwebtoken");

const jwtAuth = (req, res, next) => {
  const authHeader = req.headers["Authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "User token is not provided",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      message: "Forbidden - Invalid or expired token",
    });
  }
};

module.exports = jwtAuth;

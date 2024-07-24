const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config");

const auth = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.replace("Bearer ", "");
  console.log("Token received: ", token);

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.userId = decoded.userId;
    console.log("Decoded userId: ", req.userId);
    next();
  } catch (err) {
    console.log("Token verification failed: ", err);
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = auth;

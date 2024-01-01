const jwt = require('jsonwebtoken');
const { User } = require('../models/User');

// checks if the request has a valid JWT token
const authenticateToken = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    console.log("Received token:", token);

    if (!token) {
      console.log("No token provided");
      return res.status(401).json({ message: "Unauthorised, no token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY, { algorithms: ['HS256'] });
    console.log("Decoded token:", decoded);

    const user = await User.findById(decoded.userID);
    console.log("User from database:", user);

    if (!user) {
      console.log("Invalid token - user not found");
      return res.status(401).json({ message: "Unauthorised, invalid token" });
    }

    req.user = user;
    console.log("User attached to request:", req.user);

    next();
  } catch (error) {
    console.error("Error in authenticateToken:", error);
    res.status(401).json({ message: "Unauthorised, invalid token" });
  }
};


 module.exports = { authenticateToken };
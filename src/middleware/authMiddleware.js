const jwt = require('jsonwebtoken');
const { User } = require('../models/User');

// checks if the request has a valid JWT token
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
      return res.status(401).json({ message: "Unauthorised, no token" });
    }

    const token = authHeader.split(' ')[1]; // Extract the token
  
    const decoded = jwt.verify(token, process.env.JWT_KEY, { algorithms: ['HS256'] });

    const userId = decoded.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({ message: "Unauthorised, invalid token" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in authenticateToken:", error);
    res.status(401).json({ message: "Unauthorised, invalid token" });
  }
};

 module.exports = { authenticateToken };
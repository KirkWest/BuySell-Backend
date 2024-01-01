const jwt = require('jsonwebtoken');
const { User } = require('../models/User');

// checks if the request has a valid JWT token
const authenticateToken = async (req, res, next) => {
  const token = req.header("Authorisation");

  if (!token) {
    return res.status(401).json({ message: "Unauthorised, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const user = await User.findById(decoded.userID);

    if (!user) {
      return res.status(401).json({ message: "Unauthorised, invalid token" });
    }

    // ataches the user object to the request for use in the route
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorised, invalid token" });
  }
 };

 module.exports = { authenticateToken };
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// hashes the password using bcrypt
async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}
 // compares the given password with a hashed password
async function comparePassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

// generates a JWT token
function generateToken(user) {
  return jwt.sign({ 
    userID: user._id,
    username: user.username
  }, process.env.JWT_SECRET, { expiresIn: '1h' })
}

module.exports = {
  hashPassword,
  comparePassword,
  generateToken,
};


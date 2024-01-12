const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// hashes the password using bcrypt
function hashPassword(password) {
  const hash = bcrypt.hashSync(password, 10);
  return hash;
}
 // compares the given password with a hashed password
function comparePassword(plaintextPassword, hashedPassword) {
  const doesPasswordMatch = bcrypt.compareSync(plaintextPassword, hashedPassword);
  console.log('log password compare >>>>>', { plaintextPassword, hashedPassword, doesPasswordMatch })
  return doesPasswordMatch;
}

// generates a JWT token
function generateJwt(userId) {
  let newJwt = jwt.sign(
    { userId },
    process.env.JWT_KEY,
    { expiresIn: "7d" }
  );
  return newJwt;
}

module.exports = {
  hashPassword,
  comparePassword,
  generateJwt,
};


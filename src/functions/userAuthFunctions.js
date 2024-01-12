const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// hashes the password using bcrypt
async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}
 // compares the given password with a hashed password
 async function comparePassword(plaintextPassword, hashedPassword) {
  const doesPasswordMatch = await bcrypt.compare(plaintextPassword, hashedPassword);
  console.log("Password comparison result:", doesPasswordMatch);
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


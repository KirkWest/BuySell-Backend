const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// hashes the password using bcrypt
async function hashPassword(password) {
  try {
    const hash = await bcrypt.hash(password, 8);
    return hash;
  } catch(error) {
    console.error(`Error creating hash: ${error}`)
  }
}
 // compares the given password with a hashed password
async function comparePassword(plaintextPassword, hashedPassword) {
  try {
    const doesPasswordMatch = bcrypt.compare(plaintextPassword, hashedPassword);
    return doesPasswordMatch;
  } catch(error) {
    console.error(`Error matching password: ${error}`)
  }
}

// generates a JWT token
function generateJwt(userId) {
  let newJwt = jwt.sign(
    { userId },
    process.env.JWT_KEY,
    { expiresIn: "4h" }
  );
  return newJwt;
}

module.exports = {
  hashPassword,
  comparePassword,
  generateJwt,
};


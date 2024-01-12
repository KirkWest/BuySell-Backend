const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// hashes the password using bcrypt
async function hashPassword(password) {
  // const hash = bcrypt.hashSync(password, 10);
  try {
    const hash = await bcrypt.hash(password, 8);
    return hash;
  } catch(e) {
    console.error(`Error creating hash: ${e}`)
  }
}
 // compares the given password with a hashed password
async function comparePassword(plaintextPassword, hashedPassword) {
  // const doesPasswordMatch = bcrypt.compareSync(plaintextPassword, hashedPassword);
  // As of bcryptjs 2.4.0, compare returns a promise if callback is omitted:
  try {
    const doesPasswordMatch = bcrypt.compare(plaintextPassword, hashedPassword);
    console.log('log password compare >>>>>', { plaintextPassword, hashedPassword, doesPasswordMatch })
    return doesPasswordMatch;
  } catch(e) {
    console.error(`Error matching password: ${e}`)
  }
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


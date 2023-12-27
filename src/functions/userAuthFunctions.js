const bcrypt = require('bcryptjs');

// hashes the password using bcrypt
async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}
 // compares the given password with a hashed password
async function comparePassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

module.exports = {
  hashPassword,
  comparePassword,
};

const mongoose = require('mongoose');
const { hashPassword, comparePassword } = require('../functions/userAuthFunctions');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    unique: false,
    minlength: 8,
  },
  isAdmin: {
    type: Boolean,
    default: true, // Set as true for initial build
  }
});

// this will hash the password before saving to our database using userAuthFunctions.js
UserSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();
  const hash = await hashPassword(this.password);
  this.password = hash;
  next();
});

UserSchema.methods.comparePassword = async function (password) {
  return await comparePassword(password, this.password);
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
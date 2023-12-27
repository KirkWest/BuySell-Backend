const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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

// this will hash the password before saving to our database
UserSchema.pre(
  'save',
  async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
  }
);

// compares passwords during login
UserSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', UserSchema);



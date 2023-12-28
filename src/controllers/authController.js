const User = require('../models/User');
const { hashPassword, comparePassword } = require('../functions/userAuthFunctions');
const { generateToken } = require('../functions/userAuthFunctions');

// register new user
exports.register = async (reg, res) => {
  try {
    const { username, email, password } = req.body;

    // checks if username or email is used already
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: "Sorry that username or email is already being used"});
    }

    // this will hash the password
    const hashedPassword = await hashPassword(password);

    // this will create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // this will save the new user to the database
    await newUser.save();

    // generates a JWT token for a newUser
    const token = generateToken(newUser);

    res.status(201).json({ message: "New user registration successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// login for an existing user
exports.login = async (reg, res) => {
  try {
    const { username, password } = req.body;

    // finds the user using the username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid input" });
    }

    // compares password to the stored hashed password
    const isPasswordMatch = await comparePassword(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid input" });
    }

    const token = generateToken(user);

    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


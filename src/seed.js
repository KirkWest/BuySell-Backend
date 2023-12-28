const User = require('./models/User');
const { databaseConnect } = require('./database');

// added in a wait for connection
databaseConnect()
  .then(() => {
    // creates a new user
    const newUser = User({
      username: "User1",
      email: "user1@test.com",
      password: "Password123",
    });

      // saves the new user to the database
      return newUser.save();
  })
  .then((user) => {
    console.log("User saved:", user);
  })
  .catch((error) => {
    console.error("Error saving user:", error);
  });
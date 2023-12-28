const User = require('./models/User');

// Creating a new user
const newUser = new User({
  username: 'User1',
  email: 'user1@test.com',
  password: 'Password123',
});

// Saving the user to the database
newUser.save()
  .then((user) => {
    console.log('User saved:', user);
  })
  .catch((error) => {
    console.error('Error saving user:', error);
  });

// Comparing passwords when logging in
User.findOne({ username: 'user1' })
  .then((user) => {
    if (user) {
      return user.comparePassword('userInputPassword');
    }
    return false;
  })
  .then((isMatch) => {
    if (isMatch) {
      console.log('Passwords match');
    } else {
      console.log('Passwords do not match');
    }
  })
  .catch((error) => {
    console.error('Error comparing passwords:', error);
  });

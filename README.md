# BuySell-Backend

The backend to a BuySell day app

## src/index.js

This file loads the environment variables from our .env, it also establishes the connection to the database and starts the server on port 3000.

## src/database.js

Database contains our function that connects us to MongoDB cloud Atlas using mongoose then logs the connection status.

## src/server.js

Contains routes to test our initial database with basic routes.

## src/controllers/calendarController.js

Contains a controller method for admin to interact with the calendar called manageChildNames, this allowd the admin to add more child names to the array set for a particular day as well as update and remove names, if there are no names left in the array it will delete the event from the database.

## src/models/CalendarEvent.js

Defines the Mongoose schema for CalendarEvent, these involve simply date(this is taken from the day seleted on the calendar), and the childNames which is set to an array so it can hold multiple children or just one.

## src/models/User.js

Defines the mongoose schema for User, this is the account holder, as of initial build only the admins will have a schema, there is potential to add in parents as users at a later date. Contains properties of username, email, password, and isAdmin(this is set to default for now but can be changed at a later date if non admin users are added into the model and app). All passwords are hashed before saving and contains a function to compare the passwords during login.

## src/middleware/authMiddleware.js

AuthenticateToken will check if the request has a valid jwt token from the Authorization header. If it is valid it will decode the token, finds the user, and attaches the user object to the request.

## src/controllers/authController.js

### Registration

- Checks if the user has infilled all fields, username, email, and password with validation
- Regex for email format and also checks for existing users
- Password hashing and user creation handling
- Generates and returns the JWT if successfully registered

### Login

- Validation for username and password
- Checks for username and password in database
- Generates JWT if successfully logs in
- Error handling with responses

## src/functions/userAuthFunctions.js

This contains the functions for using bcryptjs for hashing our password and also comparing it to the saved password in the database.
It also contains a functions to generate JWT using jsonwebtoken with an expiry date of 7 days.
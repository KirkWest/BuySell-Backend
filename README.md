# BuySell-Backend

The backend to the daysale day app using the MERN stack.
Its purpose of this is to handle the database interation, authentication, and processing of the data as well as our api end points for a buying selling days app connecting with the front end here [Front end link](https://github.com/KirkWest/day-sale)

## URL link to deployed site

[daysale](https://acelp-daysale-8a5708430aac.herokuapp.com/)

## database

The data for the the app is held in MongoDB Atlas cloud server as per the calendarEvent model schema.

## list of dependencies

  "dependencies": {
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.2",
    "mongodb": "^6.3.0",
    "mongoose": "^8.0.3",
  },

## src/index.js

This file loads the environment variables from the .env set in the heroku var, it also establishes the connection to the database and starts the server on port 3000.

## src/server.js

Makes an instance of our app

## src/database.js

Database contains our function that connects us to MongoDB cloud Atlas using mongoose then logs the connection status.

## src/controllers/authController.js

The auth controller controls the function of the registration and login of the admins.

## src/controllers/calendarController.js

Contains a controller method for admin to interact with the calendar called manageChildNames, this allowd the admin to add more child names to the array set for a particular day as well as update and remove names, if there are no names left in the array it will delete the event from the database.
It also contains our fetchEvents (for the admin to see the child names in the modal), and the fetchAvailableEvents for the buy button for both admin and guest to view

## src/models/CalendarEvent.js

Defines the Mongoose schema for CalendarEvent, these involve simply date(this is taken from the day seleted on the calendar), and the childNames which is set to an array so it can hold multiple children or just one.

## src/models/User.js

Defines the mongoose schema for User, this is the account holder, as of initial build only the admins will have a schema, there is potential to add in parents as users at a later date. Contains properties of username, email, password, and isAdmin(this is set to default for now but can be changed at a later date if non admin users are added into the model and app). All passwords are hashed before saving.

## src/middleware/authMiddleware.js

AuthenticateToken will check if the request has a valid jwt token from the Authorization header. If it is valid it will decode the token, finds the user, and attaches the user object to the request.

### Registration

** Note - Registration is built in backend but not implemented in front end as of now

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
It also contains a functions to generate JWT using jsonwebtoken with an expiry date of 4hrs set.

## src/routes/authRouter.js

Contains the api endpoints for authorisation purposes, registration and logging in.

## src/routes/calendarRouter.js

Contains the API endpoints for our calendar, manageChildNames (with auth token) so the admin user can add or remove child names from database, events (with auth token) so the adminuser can fetch the children names to populate in the managechildren modal, and eventsAvailable which just finds if there are children on any date then matches that date with a day in the calendar to populate the buy buttons.
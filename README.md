# BuySell-Backend

The backend to a BuySell day app

## src/index.js

This file loads the environment variables from our .env, it also establishes the connection to the database and starts the server on port 3000.

## src/database.js

Database contains our function that connects us to MongoDB cloud Atlas using mongoose then logs the connection status.

## src/server.js

Contains routes to test our initial database with basic routes.

## src/controllers/calendarController.js

Contains a controller method for admin to interact with the calendar called "addRemoveBuyButton". It also updates the "hasBuyButton" property of the calendar based on the action.

## src/models/CalendarEvent.js

Defines the Mongoose schema for CalendarEvent showing events on the calendar ("buy button"). Contains properties of date, description, and hasBuyButton.

## src/models/User.js

Defines the mongoose schema for User, this is the account holder, as of initial build only the admins will have a schema, there is potential to add in parents as users at a later date. Contains properties of username, email, password, and isAdmin. all passwords are hashed before saving and contains a function to compare the passwords during login.

## src/middleware/authMiddleware.js

authenticateToken will check if the request has a valid jwt token. If it is valis it will decode the token, finds the user, and attaches the user object to the request.
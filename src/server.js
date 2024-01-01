const express = require('express');
const authRouter = require('./routes/authRouter');
const calendarRouter = requrie('./routes/calendarRouter.js')

// make a server instance 
const app = express();

app.use(express.json());

// authentication route
app.use('/auth', authRouter);

// calendar route
app.use('/calendar', calendarRouter);

module.exports = {
	app
}
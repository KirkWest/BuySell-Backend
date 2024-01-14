const express = require('express');
const authRouter = require('./routes/authRouter');
const calendarRouter = require('./routes/calendarRouter.js');

// make a server instance 
const app = express();

// cors for cross platform
const cors = require('cors');
app.use(cors());

app.use(express.json());

// authentication route
app.use('/auth', authRouter);

// calendar route
app.use('/calendar', calendarRouter);

module.exports = {
	app
}
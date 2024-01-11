const express = require('express');
const authRouter = require('./routes/authRouter');
const calendarRouter = require('./routes/calendarRouter.js');
const emailRouter = require('./routes/emailRouter.js');

// make a server instance 
const app = express();

const cors = require('cors');
app.use(cors());

app.use(express.json());

// authentication route
app.use('/auth', authRouter);

// calendar route
app.use('/calendar', calendarRouter);

// guest email route
app.use('/email', emailRouter);

module.exports = {
	app
}
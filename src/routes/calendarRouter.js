const express = require('express');
const router = express.Router();
const calendarController = require('../controllers/calendarController');
const { authenticateToken } = require('../middleware/authMiddleware')

// Route for adding a buy button requiring authentication
router.post('/addEvent', authenticateToken, calendarController.addEvent);

// Route for deleting a buy button requiring authentication
router.delete('/deleteEvent/:eventId', authenticateToken, calendarController.deleteEvent);

module.exports = router;

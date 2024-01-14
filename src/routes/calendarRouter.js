const express = require('express');
const router = express.Router();
const calendarController = require('../controllers/calendarController');
const { authenticateToken } = require('../middleware/authMiddleware');

// Route managing kids in the database with authentication
router.post('/manageChildNames', authenticateToken, calendarController.manageChildNames);

router.get('/events', authenticateToken, calendarController.getEvents);

router.get('/eventsAvailable', calendarController.getAvailableEvents);

module.exports = router;
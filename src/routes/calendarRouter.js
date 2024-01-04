const express = require('express');
const router = express.Router();
const calendarController = require('../controllers/calendarController');
const { authenticateToken } = require('../middleware/authMiddleware');

// Route toggling event type (buy/sell) with authentication
router.post('/toggleEventType', authenticateToken, calendarController.toggleEventType);

// Route managing kids in the database with authentication
router.post('/manageChildNames', authenticateToken, calendarController.manageChildNames);

module.exports = router;
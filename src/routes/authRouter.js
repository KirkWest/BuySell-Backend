const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const calendarController = require('../controllers/calendarController')

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/add-event', calendarController.addEvent);
router.delete('/delete-event', calendarController.deleteEvent);


module.exports = router;

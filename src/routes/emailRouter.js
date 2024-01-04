const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');

router.post('/sendGuestEmail', emailController.sendGuestEmail);

module.exports = router;
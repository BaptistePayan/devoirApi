const express = require('express');
const router = express.Router();
const userService = require('../services/loginFromForm');
const apiUrl = process.env.API_URL;

router.post('/dashboard', userService.loginFromForm);

module.exports = router;
const express = require('express');
const { login, verifyToken } = require('../controllers/auth-controllers');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/login', login);

router.get('/verify', auth, verifyToken);

module.exports = router; 
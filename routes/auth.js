const { register } = require('../controllers/users.controller');
const express = require('express');
const router = express.Router();

router.post('/auth/register', register);

module.exports = router;

const { register } = require('/controllers/users.controller');
const express = require('express');
const authMidleware = require('/middlewares/auth.middleware');

const router = express.Router();

router.post('/auth/register', register);

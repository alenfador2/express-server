const { register } = require('../controllers/users.controller');
const express = require('express');
const upload = require('../middlewares/multer');
const router = express.Router();

router.post('/auth/register', upload.single('avatar'), register);

module.exports = router;

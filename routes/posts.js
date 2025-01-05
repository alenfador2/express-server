const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts.controller');
const multer = require('multer');

const upload = multer();

router.get('/posts', postsController.get);
router.post('/posts', upload.single('file'), postsController.post);

module.exports = router;

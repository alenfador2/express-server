const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');

router.get('/posts', postsController.get);
router.post('/posts', postsController.post);
router.get('/posts/file/:id', postsController.getFile);

module.exports = router;

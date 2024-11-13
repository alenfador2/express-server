const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');
const uploadFile = require('../middlewares/upload');

router.get('/posts', postsController.get);
router.post('/posts', upload.single('file'), postsController.post);

module.exports = router;

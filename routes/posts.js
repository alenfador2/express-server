const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');
const upload = require('../middlewares/upload');

router.get('/posts', postsController.get);
router.post('/posts', upload.single('image'), postsController.post);

module.exports = router;

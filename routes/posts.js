const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');
// const upload = require('../middlewares/upload');

router.get('/posts', postsController.get);
router.post('/posts', postsController.post, function (req, res) {
  console.log(req.file, req.body);
});

module.exports = router;

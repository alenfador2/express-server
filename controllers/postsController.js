const Posts = require('../models/posts');
const multer = require('multer');
const path = require('path');
const upload = require('../middlewares/upload');

const get = async (req, res, next) => {
  try {
    const results = await Posts.find({});
    return res.json({
      status: 'success',
      code: 200,
      posts: results,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const post = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      res.json({
        status: 'failed',
        code: 400,
        message: 'missing required name - field',
      });
    }
    const file = req.file ? req.file.path : null;
    const newPost = await Posts.create({ title, content, file });

    res.json({
      status: 'success',
      code: 201,
      message: 'Added new post!',
      data: { newPost },
      file: req.file ? req.file.path : null,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  get,
  post: [upload.single('file'), post],
};

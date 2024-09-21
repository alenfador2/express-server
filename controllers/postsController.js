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
    console.log(req.body);
    console.log(req.file);
    const { title, content } = req.body;

    if (!title || !content) {
      res.json({
        status: 'failed',
        code: 400,
        message: 'missing required name - field',
      });
    }
    console.log(req.body);
    // const file = req.file ? req.file.path : null;
    const file = req.file.buffer ? req.file.buffer.path : null;
    console.log(req.file.body);
    console.log(req.file.buffer);
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
  post,
};

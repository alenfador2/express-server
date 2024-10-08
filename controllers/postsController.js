const Posts = require('../models/posts');
const multer = require('multer');
const path = require('path');
const upload = require('../middlewares/upload');
const { GridFsStorage } = require('multer-gridfs-storage/lib/gridfs');

const get = async (req, res, next) => {
  try {
    const results = await Posts.find({});
    GridFsStorage.files.findOne(
      { filename: req.params.filename },
      (err, file) => {
        if (!file || file.length === 0) {
          return res.json({
            status: 'failed',
            code: 404,
            message: 'File not found...',
          });
        } else {
          const readStream = GridFsStorage.createReadStream(file.filename);
          readStream.pipe(res);
        }
      }
    );
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
    const file = req.file ? `/images/${req.file.filename}` : null;
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

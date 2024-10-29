const Posts = require('../models/posts');
const multer = require('multer');
const path = require('path');
const upload = require('../middlewares/upload');
const mongoose = require('mongoose');
//подключение гридФс
let gfs;

const conn = mongoose.connection;

conn.once('open', () => {
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'images',
  });
});

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

    const fileId = req.file ? req.file.id : null;
    const newPost = await Posts.create({ title, content, file: fileId });

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
// функция на отображение файла
const getFile = async (req, res, next) => {
  try {
    const { id } = req.params;

    gfs.find({ _id: mongoose.Types.ObjectId(id) }).toArray((err, files) => {
      if (!files || files.length === 0) {
        return res.status(404).json({ message: 'No file found' });
      }
      gfs.openDownloadStreamByName(files[0].filename).pipe(res);
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = {
  get,
  post: [upload.single('file'), post],
  getFile,
};

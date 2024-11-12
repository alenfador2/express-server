const Posts = require('../models/posts');
const multer = require('multer');
const path = require('path');
const upload = require('../middlewares/upload');
const AWS = require('aws-sdk');

const s3 = new AWS.S3();
const BUCKET_NAME = process.env.AWS_BUCKET_NAME;

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
  const { title, content } = req.body;
  if (!title || !content) {
    res.json({
      status: 'failed',
      code: 400,
      message: 'missing required name - field',
    });
  }
  try {
    let fileUrl = '';
    if (file) {
      const params = {
        Bucket: BUCKET_NAME,
        Key: `${Date.now()}_${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
      };
      const uploadResult = await s3.upload(params).promise();
      fileUrl = uploadResult.Location;
    }

    const newPost = await Posts.create({
      title,
      content,
      fileUrl,
    });
    res.json({
      code: '201',
      results: newPost,
      message: 'Post created successfully!',
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

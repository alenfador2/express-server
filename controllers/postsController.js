const Posts = require('../models/posts');
const AWS = require('@aws-sdk/client-s3');

const s3 = new AWS.S3();
const BUCKET_NAME = process.env.AWS_BUCKET_NAME;

const get = async (req, res, next) => {
  try {
    const results = await Posts.find({});
    return res.status(200).json({
      status: 'success',
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
    return res.status(400).json({
      status: 'failed',
      message: 'Missing required fields: title or content',
    });
  }

  try {
    let fileUrl = '';
    if (req.file) {
      const params = {
        Bucket: BUCKET_NAME,
        Key: `${Date.now()}_${req.file.originalname}`,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      };

      const uploadResult = await s3.upload(params).promise();
      if (!uploadResult || !uploadResult.Location) {
        throw new Error('Failed to upload file to S3');
      }
      fileUrl = uploadResult.Location;
    }

    const newPost = await Posts.create({
      title,
      content,
      fileUrl,
    });

    return res.status(201).json({
      status: 'success',
      message: 'Post created successfully!',
      results: newPost,
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

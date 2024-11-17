require('dotenv').config();
const Posts = require('../models/posts');
const uploadFile = require('../middlewares/upload');

const BUCKET_NAME = process.env.AWS_BUCKET_NAME;
if (!BUCKET_NAME) {
  throw new Error('Bucket name is missing. Check environment variables');
}

console.log(`BUCKET_NAME: ${BUCKET_NAME}`);

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
      code: 400,
      message: 'Missing required fields: title or content',
    });
  }

  try {
    let fileUrl = '';

    if (req.file) {
      // Генерация уникального имени файла
      const key = `${Date.now()}_${req.file.originalname}`;

      // Загрузка файла в S3
      const uploadResult = await uploadFile(req.file.buffer, BUCKET_NAME, key);
      fileUrl = uploadResult.Location || '';

      if (!fileUrl) {
        throw new Error('Failed to retrieve url from s3');
      }
    }

    // Сохранение поста в базе данных
    const newPost = await Posts.create({ title, content, fileUrl });

    res.status(201).json({
      status: 'success',
      code: 201,
      results: newPost,
      message: 'Post created successfully!',
    });
  } catch (error) {
    console.error('Error creating post:', error);
    next(error);
  }
};

module.exports = {
  get,
  post,
};

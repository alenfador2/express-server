const Posts = require("../models/posts");
// const path = require("path");
console.log(Posts());
const get = async (req, res, next) => {
  try {
    const results = await Posts.find({});
    return res.json({
      status: "success",
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
    const imageUrl = req.file ? req.file.path : null;
    const newPost = await Posts.create({ title, content, imageUrl });

    if (req.file) {
      res.json({
        status: "success",
        message: "File uploaded successfully!",
        file: req.file,
      });
    }
    if (!title || !content) {
      res.json({
        status: "failed",
        code: 400,
        message: "missing required name - field",
      });
    } else {
      res.json({
        status: "success",
        code: 201,
        message: "Added new post!",
        data: { newPost },
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  get,
  post,
};

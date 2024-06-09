const Posts = require("../models/posts");

const get = async (req, res, next) => {
  try {
    const results = await Posts.getAll();
    res.json({
      status: "success",
      code: 200,
      posts: results,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = {
  get,
};

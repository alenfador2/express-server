const mongoose = require('mongoose');
const { Schema } = mongoose;

const postsSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      minLength: 2,
      maxLength: 50,
    },

    content: {
      type: String,
      required: [true, 'Content is required'],
      minLength: 5,
      maxLength: 2000,
    },
    file: {
      type: String,
      required: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Posts = mongoose.model('Posts', postsSchema, 'posts');

module.exports = Posts;

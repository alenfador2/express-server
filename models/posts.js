const mongoose = require("mongoose");
const { Schema } = mongoose;

const postsSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minLength: 2,
      maxLength: 50,
    },

    content: {
      type: String,
      required: [true, "Content is required"],
      minLength: 5,
      maxLength: 2000,
    },
    imageUrl: {
      type: String,
      required: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

postsSchema.static.getAll = async () => {
  return this.find().lean();
};

const Posts = mongoose.model("Posts", postsSchema, "posts");

module.exports = Posts;

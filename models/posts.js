const mongoose = require("mongoose");
const { Schema } = mongoose;

const postsSchema = new mongoose.Schema(
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
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// postsSchema.static.getAll = () => {
//   Posts.find().lean();
// };

module.exports = mongoose.model("db_mpj", postsSchema, "posts");

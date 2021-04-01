const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: String,
  message: String,
  name: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  likeCount: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const PostModel = mongoose.model("Post", postSchema);
module.exports = PostModel;

import mongoose, { Schema, Document, model, Model } from "mongoose";

export interface postObject extends Document {
  title: string;
  name: string;
  message: string;
  creator: string;
  tags: string[];
  selectedFile: string;
  likeCount: string[];
}

const postSchema: Schema = new mongoose.Schema({
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

const PostModel: Model<postObject> = model<postObject>("Post", postSchema);
export default PostModel;

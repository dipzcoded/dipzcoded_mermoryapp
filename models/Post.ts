import mongoose, { Schema, Document, model, Model } from "mongoose";

export interface postObject extends Document {
  title: string;
  message: string;
  creator: string;
  tags: string[];
  selectedFile: string;
  likeCount: number;
}

const postSchema: Schema = new mongoose.Schema({
  title: String,
  message: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const PostModel: Model<postObject> = model<postObject>("Post", postSchema);
export default PostModel;

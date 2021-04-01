import mongoose, { Schema, Document, model, Model } from "mongoose";

export interface userObject extends Document {
  name: string;
  email: string;
  password: string;
}

const userSchema: Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const UserModel: Model<userObject> = model<userObject>("User", userSchema);
export default UserModel;

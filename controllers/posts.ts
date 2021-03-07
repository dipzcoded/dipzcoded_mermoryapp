import { Request, Response, NextFunction } from "express";
import PostModel, { postObject } from "../models/Post";

export const getPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const data = await PostModel.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

export const getPostById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const id = req.params.id;
  console.log(typeof id);
  try {
    const post = await PostModel.findById(id);
    res.status(200).json(post);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).send("no post with that ID");
    }
    console.log(error);
    res.status(409).send({ message: error });
  }
};

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let newPost = new PostModel({ ...req.body });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.log(error);
    res.status(409).send({ message: error });
  }
};

export const updatePostById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const id = req.params.id;

  try {
    const updatedPost = await PostModel.findByIdAndUpdate(
      id,
      { $set: { ...req.body, _id: id } },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).send("no post with that ID");
    }
    console.log(error);
    res.status(409).send({ message: error });
  }
};

export const deletePostById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const id = req.params.id;
  try {
    await PostModel.findByIdAndRemove(id);
    res.status(204).json({ message: "deleted successfully" });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).send("no post with that ID");
    }
    console.log(error);
    res.status(409).send({ message: error });
  }
};

export const likePostOfId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const id = req.params.id;
  try {
    let post = await PostModel.findOne({ _id: id });
    post!.likeCount = post!.likeCount + 1;
    await post!.save();
    res.status(200).json(post);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).send("no post with that ID");
    }
    console.log(error);
    res.status(409).send({ message: error });
  }
};

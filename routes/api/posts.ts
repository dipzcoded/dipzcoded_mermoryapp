import express, { Router } from "express";
// controllers
import {
  getPosts,
  createPost,
  updatePostById,
  getPostById,
  deletePostById,
  likePostOfId,
} from "../../controllers/posts";
// middleware
import auth from "../../middleware/auth";

const router: Router = express.Router();

router.route("/").get(getPosts).post(auth, createPost);
router
  .route("/:id")
  .get(getPostById)
  .patch(auth, updatePostById)
  .delete(auth, deletePostById);

router.route("/:id/likepost").patch(auth, likePostOfId);

export default router;

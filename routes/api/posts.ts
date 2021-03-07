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

const router: Router = express.Router();

router.route("/").get(getPosts).post(createPost);
router
  .route("/:id")
  .get(getPostById)
  .patch(updatePostById)
  .delete(deletePostById);
router.route("/:id/likepost").patch(likePostOfId);

export default router;

const express = require("express");
// controllers
const {
  getPosts,
  createPost,
  updatePostById,
  getPostById,
  deletePostById,
  likePostOfId,
} = require("../../controllers/posts");
// middleware
const auth = require("../../middleware/auth");

const router = express.Router();

router.route("/").get(getPosts).post(auth, createPost);
router
  .route("/:id")
  .get(getPostById)
  .patch(auth, updatePostById)
  .delete(auth, deletePostById);

router.route("/:id/likepost").patch(auth, likePostOfId);

module.exports = router;

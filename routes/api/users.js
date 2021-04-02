const express = require("express");
// controllers
const { signUp, signIn } = require("../../controllers/users");

const router = express.Router();

router.route("/signup").post(signUp);
router.route("/signin").post(signIn);

module.exports = router;

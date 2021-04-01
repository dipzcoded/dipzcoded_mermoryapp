import express, { Router } from "express";
// controllers
import { signUp, signIn } from "../../controllers/users";

const router: Router = express.Router();

router.route("/signup").post(signUp);
router.route("/signin").post(signIn);

export default router;

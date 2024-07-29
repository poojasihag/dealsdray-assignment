import { Router } from "express";
import {
  RefreshAccessToken,
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.moddleware.js";
const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

//  Secured Routr
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresToken").post(RefreshAccessToken);

// Update User
router.route("/user").get(verifyJWT, getCurrentUser);

export default router;

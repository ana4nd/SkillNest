import express from "express";
import { getCurrentUser, loginUser, logoutUser, registerUser } from "../controllers/auth.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout",verifyJWT, logoutUser);
router.get("/me", verifyJWT, getCurrentUser);

export default router;
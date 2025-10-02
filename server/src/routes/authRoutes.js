import express from "express"
import passport from "passport";
import { registerUser,loginUser, googleAuthCallback, getCurrentUser } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { startGoogleAuth } from "../middleware/startGoogleAuth.js"
import { saveRedirect } from "../middleware/saveRedirect.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/google", saveRedirect, startGoogleAuth);
router.get("/google/callback", passport.authenticate("google", { session: false, failureRedirect: "/login" }), googleAuthCallback);
router.get("/me", protect, getCurrentUser);

export default router;
import express from "express";
import { addProgress, getAllProgress, progressInLang } from "../controllers/progress.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();


// Fetch user progress for a language
router.get("/:language", protectRoute, progressInLang);

// Mark a lesson as completed
router.post("/complete", protectRoute, addProgress);

router.get("/", protectRoute, getAllProgress);

export default router;
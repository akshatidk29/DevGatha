import express from "express";
import { changeSettings } from "../controllers/settings.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { addAchievement, addActivities } from "../controllers/activities.controller.js";
const router = express.Router();


router.post('/settings', protectRoute, changeSettings);
router.post('/achievements', protectRoute, addAchievement);
router.post('/activities', protectRoute, addActivities);

export default router;  
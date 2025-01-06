import express from "express";
import { addLesson, getLessons, getLessonsByLang, getSpecificLesson } from "../controllers/lessons.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();
// Routes

router.get('/get', getLessons);

router.get('/get/:id', getSpecificLesson);

router.post('/add', addLesson);

router.get("/:language", getLessonsByLang );


export default router;
import express from "express";
import { addLesson, getLessons, getLessonsByLang, getSpecificLesson } from "../controllers/lessons.controller.js";

const router = express.Router();

router.get('/get', getLessons);

router.get('/get/:id', getSpecificLesson);

router.post('/add', addLesson);

router.get("/:language", getLessonsByLang );


export default router;
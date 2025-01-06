import express from "express";
import {  getUserSnippets, saveSnippet } from "../controllers/snippet.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();


router.post("/save", protectRoute, saveSnippet);
router.get("/fetch", protectRoute, getUserSnippets);

export default router;
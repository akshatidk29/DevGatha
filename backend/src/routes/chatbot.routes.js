import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        injectScript: process.env.BOTPRESS_INJECT_URL,
        customScript: process.env.BOTPRESS_CUSTOM_URL,
    });
});

export default router;

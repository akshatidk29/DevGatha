import Snippet from "../models/snippets.model.js";

export const saveSnippet = async (req, res) => {
    try {
        // Check if the user is authenticated
        if (!req.user._id) {
            return res.status(401).json({ message: "User not authenticated." });
        }

        const { title, code, language } = req.body;
        const newSnippet = new Snippet({ title, code, language, userId: req.user._id });

        // Save the new snippet to the database
        await newSnippet.save();

        res.status(201).json({ message: "Snippet saved successfully!" });
    } catch (error) {
        console.error(error); // Log error in case of failure
        res.status(500).json({ message: "Failed to save snippet." });
    }
};

export const getUserSnippets = async (req, res) => {
    try {
        // Fetch snippets for the current user
        const snippets = await Snippet.find({ userId: req.user._id });
        res.status(200).json({ snippets });
    } catch (error) {
        console.error(error); // Log error in case of failure
        res.status(500).json({ message: "Failed to fetch snippets." });
    }
};

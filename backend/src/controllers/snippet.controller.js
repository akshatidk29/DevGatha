import Snippet from "../models/snippets.model.js"

export const saveSnippet = async (req, res) => {
    console.log("GGG");
    
    try {
        if (!req.user._id) {
            return res.status(401).json({ message: "User not authenticated." });
        }
        const { title, code , language} = req.body;
        const newSnippet = new Snippet({ title, code, language, userId: req.user._id });
        await newSnippet.save();
        res.status(201).json({ message: "Snippet saved successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to save snippet." });
    }
};

export const getUserSnippets = async (req, res) => {
    try {
      // Fetch snippets for the current user
      const snippets = await Snippet.find({ userId: req.user._id });
      res.status(200).json({ snippets });
      console.log("OK");
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch snippets." });
    }
  };

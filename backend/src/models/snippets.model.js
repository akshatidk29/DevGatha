import mongoose from "mongoose";

const snippetSchema = new mongoose.Schema({
    title: { type: String, required: true },
    code: { type: String, required: true },
    language: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now },
});

const Snippet = mongoose.model("Snippet", snippetSchema);

export default Snippet;
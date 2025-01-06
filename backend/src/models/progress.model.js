import mongoose from "mongoose";

const ProgressSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    python: {
        totalLessons: Number,
        completedLessons: Number,
        completedLessonIds: [Number],
    },
    c: {
        totalLessons: Number,
        completedLessons: Number,
        completedLessonIds: [Number],
    },
    cpp: {
        totalLessons: Number,
        completedLessons: Number,
        completedLessonIds: [Number],
    },
});

const Progress = mongoose.model("Progress", ProgressSchema);

export default Progress;
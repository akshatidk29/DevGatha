import Progress from "../models/progress.model.js"
import Lesson from "../models/lessons.model.js";

// Controller to get progress in a specific language for the authenticated user
export const progressInLang = async (req, res) => {
    const { language } = req.params;
    const userId = req.user._id; // Get the userId from the authenticated user
    try {
        // Fetch progress data for the user
        const progress = await Progress.findOne({ userId });
        
        if (!progress || !progress[language]) {
            // If no progress exists for the language, return default progress
            return res.json({
                success: true,
                progress: { totalLessons: 0, completedLessons: 0, completedLessonIds: [] },
            });
        }
        
        // Return the progress data for the specified language
        res.json({
            success: true,
            progress: {
                totalLessons: progress[language].totalLessons || 0,
                completedLessons: progress[language].completedLessons || 0,
                completedLessonIds: progress[language].completedLessonIds || [],
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching progress", error });
    }
}

// Controller to add progress for a specific lesson for the authenticated user
export const addProgress = async (req, res) => {
    const userId = req.user._id; // Get userId from authenticated user
    const { language, lessonId } = req.body;
    try {
        // Find progress for the user
        const progress = await Progress.findOne({ userId });

        if (!progress) {
            // If no progress exists, initialize a new progress document for the user
            const newProgress = new Progress({
                userId,
                [language]: {
                    totalLessons: await Lesson.countDocuments({ language }), // Count total lessons for the language
                    completedLessons: 1, // Mark the current lesson as completed
                    completedLessonIds: [lessonId], // Add the lesson ID to the completed lesson list
                },
            });
            await newProgress.save();
            return res.json({ success: true, message: "Progress initialized and lesson marked as completed." });
        }

        // If progress exists for the language
        if (!progress[language]) {
            // If the language is not yet tracked, initialize it
            progress[language] = {
                totalLessons: await Lesson.countDocuments({ language }), // Count total lessons
                completedLessons: 1, // Mark the current lesson as completed
                completedLessonIds: [lessonId], // Add the lesson ID to the completed lesson list
            };
        } else {
            // Update existing progress
            if (!progress[language].completedLessonIds.includes(lessonId)) {
                progress[language].completedLessonIds.push(lessonId); // Add the lesson ID to the completed list
                progress[language].completedLessons = (progress[language].completedLessons || 0) + 1; // Increment completed lessons
            }
        }

        // Save updated progress
        await progress.save();
        res.json({ success: true, message: "Lesson marked as completed." });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating progress", error });
    }
}

// Controller to get all progress data for the authenticated user
export const getAllProgress = async (req, res) => {
    const userId = req.user._id; // Get userId from authenticated user
    try {
        let progress = await Progress.findOne({ userId });

        if (!progress) {
            // If no progress exists, create a new progress document for the user
            progress = new Progress({
                userId,
                python: {
                    completedLessons: 0,
                    totalLessons: await Lesson.countDocuments({ language: 'python' }),
                    completedLessonIds: [], // Initialize completed lessons array
                },
                cpp: {
                    completedLessons: 0,
                    totalLessons: await Lesson.countDocuments({ language: 'cpp' }),
                    completedLessonIds: [], // Initialize completed lessons array
                },
                c: {
                    completedLessons: 0,
                    totalLessons: await Lesson.countDocuments({ language: 'c' }),
                    completedLessonIds: [], // Initialize completed lessons array
                },
            });

            // Save the newly created progress document
            await progress.save();
            return res.status(201).json({ success: true, progress, message: "New progress created." });
        }

        // Return existing progress
        res.json({ success: true, progress });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching progress", error });
    }
};

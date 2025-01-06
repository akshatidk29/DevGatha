import Progress from "../models/progress.model.js"
import Lesson from "../models/lessons.model.js";

export const progressInLang = async (req, res) => {
    const { language } = req.params;
    const  userId  = req.user._id; // Pass userId as query param
    try {
        const progress = await Progress.findOne({ userId });
        if (!progress || !progress[language]) {
            return res.json({
                success: true,
                progress: { totalLessons: 0, completedLessons: 0, completedLessonIds: [] },
            });
        }
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

export const addProgress = async (req, res) => {
    const userId = req.user._id;
    const { language, lessonId } = req.body;
    try {
        const progress = await Progress.findOne({ userId });

        if (!progress) {
            // Initialize progress for the user
            const newProgress = new Progress({
                userId,
                [language]: {
                    totalLessons: await Lesson.countDocuments({ language }),
                    completedLessons: 1,
                    completedLessonIds: [lessonId],
                },
            });
            await newProgress.save();
            return res.json({ success: true, message: "Progress initialized and lesson marked as completed." });
        }

        if (!progress[language]) {
            progress[language] = {
                totalLessons: await Lesson.countDocuments({ language }),
                completedLessons: 1,
                completedLessonIds: [lessonId],
            };
        } else {
            // Update existing progress
            if (!progress[language].completedLessonIds.includes(lessonId)) {
                progress[language].completedLessonIds.push(lessonId);
                progress[language].completedLessons = ( progress[language].completedLessons || 0 )+ 1;
            }
        }

        await progress.save();
        res.json({ success: true, message: "Lesson marked as completed." });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating progress", error });
        console.log(error.message);
    }
}


export const getAllProgress = async (req, res) => {
    const  userId  = req.user._id; // Assumes user authentication is in place
  
    try {
      const progress = await Progress.findOne({ userId });
      if (!progress) {
        return res.status(404).json({ success: false, message: "No progress found for this user." });
      }
  
      res.json({ success: true, progress });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error fetching progress", error });
    }
  };
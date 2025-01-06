import Lesson from "../models/lessons.model.js"
import Progress from "../models/progress.model.js"; // Import the Progress model

export const getLessons = async (req, res) => {
    try {
        const lessons = await Lesson.find();
        res.json({ success: true, lessons });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch lessons', error });
    }
}

export const getSpecificLesson = async (req, res) => {
    try {
        const lesson = await Lesson.findById(req.params.id);
        if (!lesson) {
            return res.status(404).json({ success: false, message: 'Lesson not found' });
        }
        res.json({ success: true, lesson });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch lesson', error });
    }
}

export const getLessonsByLang = async (req, res) => {
    const { language } = req.params;
    try {
        const lessons = await Lesson.find({ language });
        res.json({ success: true, lessons });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching lessons", error });
    }

}

export const addLesson = async (req, res) => {
    try {
        const newLesson = new Lesson(req.body);
        const userProgress = await Progress.find({});
        await newLesson.save();

        // Iterate over each user's progress and update the total lessons for the corresponding language
        for (const progress of userProgress) {
            if (newLesson.language === "python") {
                // Ensure that totalLessons is a number before incrementing
                progress.python.totalLessons = (progress.python.totalLessons || 0) + 1;
            } else if (newLesson.language === "c") {
                // Ensure that totalLessons is a number before incrementing
                progress.c.totalLessons = (progress.c.totalLessons || 0) + 1;
            } else if (newLesson.language === "cpp") {
                // Ensure that totalLessons is a number before incrementing
                progress.cpp.totalLessons = (progress.cpp.totalLessons || 0) + 1;
            }

            // Save the updated progress
            await progress.save();
        }
        res.status(201).json({ success: true, message: 'Lesson added successfully', lesson: newLesson });
    } catch (error) {
        console.log("Here the error is", error);
        res.status(400).json({ success: false, message: 'Failed to add lesson', error });
    }
}

import Lesson from "../models/lessons.model.js"
import Progress from "../models/progress.model.js"; // Import the Progress model

// Controller to get all lessons
export const getLessons = async (req, res) => {
    try {
        // Fetch all lessons from the database
        const lessons = await Lesson.find();
        res.json({ success: true, lessons }); // Return lessons in the response
    } catch (error) {
        // Handle error and send a failure message
        res.status(500).json({ success: false, message: 'Failed to fetch lessons', error });
    }
}

// Controller to get a specific lesson by its ID
export const getSpecificLesson = async (req, res) => {
    try {
        // Fetch lesson by ID from the database
        const lesson = await Lesson.findById(req.params.id); 
        if (!lesson) {
            return res.status(404).json({ success: false, message: 'Lesson not found' }); // Handle case when lesson is not found
        }
        res.json({ success: true, lesson }); // Return the lesson details
    } catch (error) {
        // Handle error and send a failure message
        res.status(500).json({ success: false, message: 'Failed to fetch lesson', error });
    }
}

// Controller to get lessons filtered by language
export const getLessonsByLang = async (req, res) => {
    const { language } = req.params;
    try {
        // Fetch lessons filtered by the specified language
        const lessons = await Lesson.find({ language });
        res.json({ success: true, lessons }); // Return lessons in the response
    } catch (error) {
        // Handle error and send a failure message
        res.status(500).json({ success: false, message: "Error fetching lessons", error });
    }
}

// Controller to add a new lesson
export const addLesson = async (req, res) => {
    try {
        // Create a new lesson object from the request body
        const newLesson = new Lesson(req.body);
        const userProgress = await Progress.find({}); // Fetch all user progress

        // Save the new lesson to the database
        await newLesson.save();

        // Iterate over each user's progress and update total lessons for the corresponding language
        for (const progress of userProgress) {
            if (newLesson.language === "python") {
                // Increment the total lessons for Python if the lesson is for Python
                progress.python.totalLessons = (progress.python.totalLessons || 0) + 1;
            } else if (newLesson.language === "c") {
                // Increment the total lessons for C if the lesson is for C
                progress.c.totalLessons = (progress.c.totalLessons || 0) + 1;
            } else if (newLesson.language === "cpp") {
                // Increment the total lessons for C++ if the lesson is for C++
                progress.cpp.totalLessons = (progress.cpp.totalLessons || 0) + 1;
            }

            // Save the updated progress for each user
            await progress.save();
        }
        res.status(201).json({ success: true, message: 'Lesson added successfully', lesson: newLesson });
    } catch (error) {
        // Handle error and send a failure message
        res.status(400).json({ success: false, message: 'Failed to add lesson', error });
    }
}

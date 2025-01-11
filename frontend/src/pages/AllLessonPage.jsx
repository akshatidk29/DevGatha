import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../lib/axios.js";
import { addActivity, addAchievement } from "../store/useActivitiesStore.js";
import toast from "react-hot-toast";

const AllLessonsPage = () => {
    const milestones = [10, 15, 20, 25, 50, 100];
    const { language } = useParams(); // Destructure language from useParams
    const [lessons, setLessons] = useState([]); // Initialize lessons as an empty array
    const [progress, setProgress] = useState(null); // Initialize progress state
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchLessons = async () => {
        try {
            const response = await axiosInstance.get(`/lessons/${language}`);
            setLessons(response.data.lessons || []); // Default to an empty array if lessons is undefined
            setError(null); // Clear any previous errors
        } catch (err) {
            console.error("Error fetching lessons:", err);
            setError("Failed to load lessons. Please try again.");
        }
    };

    const fetchProgress = async () => {
        try {
            const response = await axiosInstance.get(`/progress/${language}`);
            setProgress(response.data.progress);

        } catch (err) {
            console.error("Error fetching progress:", err);
        }
    };
    useEffect(() => {

        fetchLessons();
        fetchProgress();
    }, [language]);

    const handleAddProgress = async (lessonId) => {
        console.log("LessonNumber is ", lessonId);
        try {
            const response = await axiosInstance.post(`/progress/complete`, {
                language,
                lessonId,
            });

            if (response.status === 200) {
                toast.success("Lesson is Marked Completed");

                // Add the activity for lesson completion
                await addActivity(`Completed a Lesson`, `You have completed the lesson ${lessonId} in the ${language} Course.`);

                // Fetch the updated progress after marking the lesson as completed
                const updatedProgress = await axiosInstance.get(`/progress/${language}`);

                // Loop through milestones and check if the user has reached any
                for (let milestone of milestones) {
                    if (updatedProgress.data.progress.completedLessons === milestone) {
                        await addAchievement(`Completed ${milestone} Lessons`, `You have completed ${milestone} Lessons in the ${language} Course.`);
                        await addActivity(`Completed ${milestone} Lessons`, `You have completed ${milestone} Lessons in the ${language} Course.`);
                    }
                }

                // Add achievement and activity for course completion
                if (updatedProgress.data.progress.completedLessons === updatedProgress.data.progress.totalLessons) {
                    await addAchievement(`Completed a Course`, `Wohoo!! You have Completed the ${language} Course.`);
                    await addActivity(`Completed a Course`, `Wohoo!! You have Completed the ${language} Course.`);
                }

                // Update the progress state with the most recent data
                setProgress(updatedProgress.data.progress);
            }
        } catch (err) {
            console.error("Error updating progress:", err);
            toast.error("Failed to Mark Lesson Completed");
        }
    };


    if (error) return <p>{error}</p>;

    return (
        <div className="min-h-screen mt-16 p-5 dark:bg-slate-900 dark:text-white">
            <h2 className="text-2xl w-fit p-3 rounded-3xl text-center mb-6 border border-black bg-slate-600 text-white dark:bg-gray-200 dark:border-cyan-300 mx-auto dark:text-black" style={{ fontFamily: "sans-serif" }}>
                {language ? language.charAt(0).toUpperCase() + language.slice(1) : "Language"} Lessons
            </h2>


            <section className="my-12 sm:px-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {lessons && lessons.length > 0 ? (
                        <ul className="space-y-6">
                            {lessons.map((lesson) => {
                                console.log("Progress is ", progress);
                                const isCompleted = progress && progress.completedLessonIds.includes(lesson.lessonNumber);

                                return (
                                    <li key={lesson._id}>
                                        <div
                                            className={`ml-4 p-3 border-2 rounded-3xl shadow-lg hover:shadow-2xl transition-all ease-in-out duration-300 ${isCompleted ? "bg-green-400 border-black dark:border-red-400" : "bg-white border-gray-500 dark:border-red-300"}`} >
                                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                                {lesson.title}
                                            </h3>
                                            <p className="text-sm text-gray-700 mb-4">
                                                Language: {lesson.language}
                                            </p>
                                            <div className="flex items-center space-x-2">
                                                {isCompleted && (
                                                    <span className="text-xl">✅</span>
                                                )}
                                                <button
                                                    className="btn btn-sm bg-black text-white px-4 py-2 rounded-2xl border dark:border-white hover:bg-white hover:text-black transition-colors duration-300"
                                                    onClick={() => navigate(`/lessons/get/${lesson._id}`)} >
                                                    View Lesson
                                                </button>
                                                {/* Mark lesson as completed */}
                                                {!isCompleted && (
                                                    <button
                                                        className="btn btn-sm bg-green-600 text-white px-4 py-2 rounded-2xl hover:bg-green-700 transition-colors duration-300"
                                                        onClick={() => handleAddProgress(lesson.lessonNumber)}
                                                    >
                                                        Mark as Completed
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    ) : (
                        <p className="text-center text-gray-600">No lessons available.</p>
                    )}
                </div>
            </section>
        </div>
    );
};

export default AllLessonsPage;

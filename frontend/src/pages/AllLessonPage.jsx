import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

const AllLessonsPage = () => {
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
                fetchProgress();
                // Optionally, update the progress state here to reflect the new progress
            }
        } catch (err) {
            console.error("Error updating progress:", err);
            toast.error("Failed to Mark Lesson Completed");
        }
    };

    if (error) return <p>{error}</p>;

    return (
        <div className="min-h-screen bg-gray-50">
            <h2 className="text-3xl font-semibold text-left mb-6 mt-16 text-gray-800">
                {language ? language.toUpperCase() : "Language"} Lessons
            </h2>
            <section className="my-12 px-4 sm:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {lessons && lessons.length > 0 ? (
                        <ul className="space-y-6">
                            {lessons.map((lesson) => {
                                console.log("Progress is ", progress);
                                const isCompleted = progress && progress.completedLessonIds.includes(lesson.lessonNumber);

                                return (
                                    <li key={lesson._id}>
                                        <div
                                            className={`p-6 border-2 rounded-2xl shadow-lg hover:shadow-xl transition-all ease-in-out duration-300 ${isCompleted ? "bg-green-100 border-green-500" : "bg-white border-gray-200"
                                                }`}
                                        >
                                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                                {lesson.title}
                                            </h3>
                                            <p className="text-sm text-gray-600 mb-4">
                                                Language: {lesson.language}
                                            </p>
                                            <div className="flex items-center space-x-2">
                                                {isCompleted && (
                                                    <span className="text-green-500 text-xl">✅</span>
                                                )}
                                                <button
                                                    className="btn btn-sm bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
                                                    onClick={() => navigate(`/lessons/get/${lesson._id}`)}
                                                >
                                                    View Lesson
                                                </button>
                                                {/* Mark lesson as completed */}
                                                {!isCompleted && (
                                                    <button
                                                        className="btn btn-sm bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors duration-300"
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

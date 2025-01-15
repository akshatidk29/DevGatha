import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../lib/axios';
import { format, parseISO } from 'date-fns';
import boyAvatar from "../img/boy.png"
import girlAvatar from "../img/girl.png"

const ProfilePage = () => {
    const { authUser } = useAuthStore();
    const [progress, setProgress] = useState(null);
    const [error, setError] = useState(null);
    const formattedDate = format(parseISO(authUser.createdAt), 'dd MMMM yyyy');
    const [avatar, setAvatar] = useState(boyAvatar); // State for the avatar image

    const handleChangeAvatar = () => {
        setAvatar(prevAvatar => prevAvatar === boyAvatar ? girlAvatar : boyAvatar); // Toggle avatar
    };

    useEffect(() => {
        const fetchProgress = async () => {
            try {
                const response = await axiosInstance.get(`/progress`);
                setProgress(response.data.progress);
                setError(null); // Clear any previous errors
            } catch (err) {
                console.error("Error fetching progress:", err);
                setError("Failed to load progress. Please try again.");
            }
        };
        fetchProgress();
    }, []);



    return (
        <div className="mt-16 dark:bg-slate-900">
            <div className="p-4 dark:bg-slate-800">
                {/* User Overview */}
                <div className="flex items-center gap-6">
                    <img
                        src={avatar}
                        alt="Profile"
                        className="w-2/12 rounded-full border border-black dark:border-gray-200 transition-transform duration-300 ease-in-out transform hover:scale-110"
                        onClick={handleChangeAvatar}
                    />
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{authUser.fullName}</h1>
                        <p className="text-sm text-gray-700 dark:text-gray-400">{authUser.email}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            Welcome back, {authUser.fullName}! Keep pushing forward.
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            Since {formattedDate}
                        </p>
                    </div>
                </div>



                {/* Progress Summary */}
                <section className="my-12">

                    <h2 className="text-2xl font-semibold mb-4">
                        Your Learning Progress
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="cursor-pointer">
                            <Link to="/lessons/python">
                                <div
                                    className={`p-4 border rounded-3xl shadow-md transition-all ${progress && progress.python.totalLessons > 0 && progress.python.completedLessons === progress.python.totalLessons
                                        ? "font-bold bg-white border-lime-950 text-green-800   hover:bg-green-400   hover:text-blue-800                   dark:bg-green-700 dark:text-white dark:hover:bg-white dark:hover:text-black"
                                        : "font-bold bg-white border-lime-950 text-black   hover:bg-gray-300  hover:text-blue-800                   dark:bg-gray-400 dark:text-white dark:hover:bg-white dark:hover:text-black"
                                        }`}
                                >
                                    <h3 className="text-2xl " style={{ fontFamily: "cursive" }}>Python</h3>
                                    <progress className="progress w-56" value={progress ? (progress.python.completedLessons / progress.python.totalLessons) * 100 : 0} max="100"></progress>
                                    <p className="text-sm text-black dark:text-white dark:hover:text-black">
                                        {progress
                                            ? `${(progress.python.completedLessons || 0)} of ${(progress.python.totalLessons || 0)} lessons completed`
                                            : "Loading progress..."}
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="cursor-pointer">
                            <Link to="/lessons/cpp">
                                <div
                                    className={`p-4 border rounded-3xl shadow-md transition-all ${progress && progress.cpp.totalLessons > 0 && progress.cpp.completedLessons === progress.cpp.totalLessons

                                        ? "font-bold bg-white border-lime-950 text-green-800   hover:bg-green-400   hover:text-blue-800                   dark:bg-green-700 dark:text-white dark:hover:bg-white dark:hover:text-black"
                                        : "font-bold bg-white border-lime-950 text-black   hover:bg-gray-300  hover:text-blue-800                   dark:bg-gray-400 dark:text-white dark:hover:bg-white dark:hover:text-black"
                                        }`}
                                >
                                    <h3 className="text-2xl " style={{ fontFamily: "cursive" }}>Cpp</h3>
                                    <progress className="progress w-56" value={progress ? (progress.cpp.completedLessons / progress.cpp.totalLessons) * 100 : 0} max="100"></progress>
                                    <p className="text-sm text-black dark:text-white dark:hover:text-black">
                                        {progress
                                            ? `${(progress.cpp.completedLessons || 0)}  of ${(progress.cpp.totalLessons || 0)} lessons completed`
                                            : "Loading progress..."}
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="cursor-pointer">
                            <Link to="/lessons/c">
                                <div
                                    className={`p-4 border rounded-3xl shadow-md transition-all ${progress && progress.c.totalLessons > 0 && progress.c.completedLessons === progress.c.totalLessons
                                        ? "font-bold bg-white border-lime-950 text-green-800   hover:bg-green-400   hover:text-blue-800                   dark:bg-green-700 dark:text-white dark:hover:bg-white dark:hover:text-black"
                                        : "font-bold bg-white border-lime-950 text-black   hover:bg-gray-300  hover:text-blue-800                   dark:bg-gray-400 dark:text-white dark:hover:bg-white dark:hover:text-black"
                                        }`}
                                >
                                    <h3 className="text-2xl " style={{ fontFamily: "cursive" }}>C</h3>
                                    <progress className="progress w-56" value={progress ? (progress.c.completedLessons / progress.c.totalLessons) * 100 : 0} max="100"></progress>
                                    <p className="text-sm text-black dark:text-white dark:hover:text-black">
                                        {progress
                                            ? `${(progress.c.completedLessons || 0)} of ${(progress.c.totalLessons || 0)} lessons completed`
                                            : "Loading progress..."}
                                    </p>
                                </div>
                            </Link>
                        </div>


                    </div>
                </section>

                {/* Achievements Dashboard */}
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Achievements</h2>
                    <div className="flex flex-wrap gap-4">
                        {authUser.achievements && authUser.achievements.length > 0 ? (
                            authUser.achievements.map((achievement, index) => (
                                <div
                                    key={index}
                                    className="rounded-3xl min-w-72 border border-black  bg-orange-400 text-gray-900  px-5 py-2 dark:border-cyan-200 shadow-lg"
                                >
                                    <h3 className="text-lg font-semibold text-gray-900 ">
                                        {achievement.title}
                                    </h3>
                                    <p className="text-sm mt-1">
                                        {achievement.description}
                                    </p>
                                    <p className="text-xs text-gray-900 mt-1">
                                        {new Date(achievement.date).toLocaleDateString()}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                No achievements yet.
                            </p>
                        )}
                    </div>
                </div>


                {/* Last Activity */}
                {/* Recent Activities */}
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Recent Activity</h2>
                    {authUser.recentActivities && authUser.recentActivities.length > 0 ? (
                        authUser.recentActivities.map((activity, index) => (
                            <div
                                key={index}
                                className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 border border-black dark:border-white rounded-3xl shadow-sm mb-4 "
                            >
                                <h3 className="font-semibold text-gray-900 dark:text-white">
                                    {activity.title}
                                </h3>
                                <p className="text-sm mt-1">
                                    {activity.description}
                                </p>
                                {/* Format date and time */}
                                <p className="text-xs text-gray-700 dark:text-gray-300 mt-1">
                                    {new Date(activity.date).toLocaleString('en-US', {
                                        month: 'long', day: 'numeric', year: 'numeric',
                                        hour: '2-digit', minute: '2-digit', hour12: true
                                    }).replace(',', '')}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-gray-500 dark:text-gray-400">No recent activity yet.</p>
                    )}
                </div>



                {/* Motivational Section */}
                <div className="mt-8 mx-auto w-fit bg-gray-100 dark:bg-gray-700 p-4 rounded-2xl">
                    <p className="text-center text-sm font-medium text-gray-800 dark:text-gray-300">
                        Clean code always looks like it was written by someone who cares..
                    </p>
                </div>


            </div>
        </div>
    );
};

export default ProfilePage;

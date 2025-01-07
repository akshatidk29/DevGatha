import React, { useState } from 'react';
import { axiosInstance } from '../lib/axios'; // Assuming axios instance is set up
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const SettingsPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [currentPassword, setCurrentPassword] = useState(''); // Initial password
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axiosInstance.post('/user/settings', {
                name,
                email,
                password,
                currentPassword,
            });

            if (response.status === 200) {
                toast.success('Settings updated successfully!, Please Login With New Details');
                setName('');
                setEmail('');
                setPassword('');
                setCurrentPassword('');
                setTimeout(() => {
                    window.location.reload();
                }, 1000); // Optional delay for user experience
                navigate('/login');
            }
        } catch (error) {
            console.error(error);
            if (error.response?.status === 401) {
                toast.error('Incorrect current password.');
            } else if (error.response?.status === 404) {
                toast.error('User not found.');
            } else {
                console.log("Error is", error);
                toast.error('Failed to update settings. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className="min-h-screen bg-gray-50 flex justify-center items-center py-20 dark:bg-slate-900">
            <div className="bg-white border border-black p-8 rounded-3xl shadow-lg w-full max-w-md dark:bg-slate-900 dark:border-white">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4 dark:text-white">Update Settings</h2>

                <form onSubmit={handleSubmit} >
                    <div className="mb-2">
                        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-2 dark:text-white">Current Password</label>
                        <input
                            type="password"
                            id="currentPassword"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                            className="w-3/5 p-3 border border-black dark:border-white rounded-2xl dark:text-white dark:bg-transparent  "
                            placeholder="Enter your current password"
                        />
                    </div>

                    {/* Name */}
                    <div className="mb-2">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2 dark:text-white">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-3 border border-black rounded-2xl dark:border-white dark:text-white dark:bg-transparent "
                            placeholder="Enter your name"
                        />
                    </div>

                    {/* Email */}
                    <div className="mb-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 dark:text-white">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border border-black rounded-2xl dark:border-white dark:text-white dark:bg-transparent "
                            placeholder="Enter your email"
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-3">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">New Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-3/5 p-3 border border-black rounded-2xl dark:border-white dark:text-white dark:bg-transparent"
                            placeholder="Enter your new password"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-2/5 py-3 border border-black text-white font-semibold rounded-3xl bg-black hover:bg-white hover:text-black dark:hover:bg-white dark:hover:bg-`} >
                        {loading ? "Updating..." : "Save Changes"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SettingsPage;

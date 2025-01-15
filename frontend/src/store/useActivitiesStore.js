import { axiosInstance } from "../lib/axios.js";

// Function to add an achievement
export const addAchievement = async (title, description) => {
    try {
        const achievementData = {
            title: title,
            description: description,
            date: new Date().toISOString(), 
        };

        const response = await axiosInstance.post("/user/achievements", achievementData);
        return response.data;
    } catch (error) {
        throw new Error("Failed to add achievement.");
    }
};

// Function to add an activity
export const addActivity = async (title, description) => {
    try {
        const activityData = {
            title: title,
            description: description,
            date: new Date().toISOString(), 
        };

        const response = await axiosInstance.post("user/activities", activityData);
        return response.data; 
    } catch (error) {
        console.log("Error is", error.message);
        throw new Error("Failed to add activity.");
    }
};

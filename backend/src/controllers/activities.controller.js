import { body, validationResult } from 'express-validator';
import User from "../models/user.model.js";

export const addAchievement = [
    // Validation middleware
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('date')
        .optional()
        .isISO8601()
        .withMessage('Date must be a valid ISO 8601 string'),

    // Route handler
    async (req, res) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, description, date } = req.body;
        const userId = req.user._id;

        try {
            const user = await User.findById(userId); // Use findById instead of findOne
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const newAchievement = {
                title,
                description,
                date: date || new Date().toISOString(),
            };

            user.achievements.push(newAchievement);
            await user.save();

            res.status(200).json({
                message: 'Achievement added successfully',
                achievement: newAchievement,
            });
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ message: 'Server error' });
        }
    }
];


export const addActivities = async (req, res) => {
    const { title, description, date } = req.body;
    const userId = req.user._id; // Assuming user authentication middleware adds user to req object.

    try {
        // Find the user by their ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create a new activity object
        const newActivity = {
            title,
            description,
            date: date || new Date().toISOString(), // Use provided date or default to current date
        };

        // Add the new activity to the beginning of the activities array
        user.recentActivities.unshift(newActivity);

        // Ensure the activities array contains only the latest 3 activities
        if (user.recentActivities.length > 3) {
            user.recentActivities = user.recentActivities.slice(0, 3);
        }

        // Save the updated user
        await user.save();

        res.status(200).json({
            message: 'Activity added successfully',
            activity: newActivity,
            activities: user.recentActivities, // Return the updated list of activities
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

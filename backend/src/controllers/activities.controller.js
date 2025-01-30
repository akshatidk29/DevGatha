import { body, validationResult } from 'express-validator';
import User from "../models/user.model.js";

// Add achievement controller
export const addAchievement = [ 
    // Validation middleware for input fields
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('date')
        .optional()
        .isISO8601()
        .withMessage('Date must be a valid ISO 8601 string'),

    // Route handler for adding an achievement
    async (req, res) => {
        // Checking for validation errors from the request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, description, date } = req.body;
        const userId = req.user._id; // Get the user ID from the authenticated user

        try {
            // Find the user in the database using their user ID
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Create the new achievement object with the provided fields
            const newAchievement = {
                title,
                description,
                date: date || new Date().toISOString(), // If no date is provided, use the current date
            };

            // Push the new achievement into the user's achievements array
            user.achievements.push(newAchievement);
            await user.save(); // Save the updated user to the database

            // Send a success response with the new achievement details
            res.status(200).json({
                message: 'Achievement added successfully',
                achievement: newAchievement,
            });
        } catch (error) {
            console.error(error.message); // Log the error
            res.status(500).json({ message: 'Server error' }); // Send a server error response
        }
    }
];

// Add activities controller
export const addActivities = async (req, res) => {
    const { title, description, date } = req.body;
    const userId = req.user._id; // Get the user ID from the authenticated user

    try {
        // Find the user in the database using their user ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create the new activity object with the provided fields
        const newActivity = {
            title,
            description,
            date: date || new Date().toISOString(), // If no date is provided, use the current date
        };

        // Add the new activity to the beginning of the user's recent activities array
        user.recentActivities.unshift(newActivity);

        // Ensure that only the latest 3 activities are kept in the recentActivities array
        if (user.recentActivities.length > 3) {
            user.recentActivities = user.recentActivities.slice(0, 3); // Keep only the latest 3
        }

        // Save the updated user information in the database
        await user.save();

        // Send a success response with the new activity and the updated activities list
        res.status(200).json({
            message: 'Activity added successfully',
            activity: newActivity,
            activities: user.recentActivities, // Return the updated list of recent activities
        });
    } catch (error) {
        console.error(error.message); // Log the error
        res.status(500).json({ message: 'Server error' }); // Send a server error response
    }
};

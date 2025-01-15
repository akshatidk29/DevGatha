import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const changeSettings = async (req, res) => {
    const userId = req.user._id; // Get the user ID from the authenticated user
    const { email, currentPassword, name, password } = req.body;

    try {
        // Fetch the user from the database using user ID
        const user = await User.findOne({ _id: userId });

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Verify the current password provided by the user
        const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Incorrect current password.' });
        }

        // Update the user's name if provided
        if (name) user.fullName = name;

        // Update email if provided and ensure it's not already taken
        if (email && email !== user.email) {
            const emailExists = await User.findOne({ email });
            if (emailExists) {
                return res.status(400).json({ message: 'Email already in use.' });
            }
            user.email = email;
        }

        // Update the password if provided
        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        // Save the updated user details
        await user.save();

        // Clear the JWT cookie on successful update to reauthenticate the user
        res.cookie("jwt", "", { maxAge: 0 });

        res.status(200).json({ message: 'User settings updated successfully.' });
    } catch (error) {
        console.error(error); // Log error in case of failure
        res.status(500).json({ message: 'Internal server error.' });
    }
};

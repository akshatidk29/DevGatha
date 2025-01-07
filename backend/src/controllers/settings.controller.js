import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const changeSettings = async (req, res) => {
    const userId = req.user._id;
    const { email, currentPassword, name, password } = req.body;
    console.log(userId);

    try {
        // Assuming `req.user._id` is available after authentication middleware
        const user = await User.findOne(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Verify the current password
        const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Incorrect current password.' });
        }

        // Update fields if provided
        if (name) user.fullName = name;

        if (email && email !== user.email) {
            // Check for existing email in the database
            const emailExists = await User.findOne({ email });
            if (emailExists) {
                return res.status(400).json({ message: 'Email already in use.' });
            }
            user.email = email;
        }

        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        // Save updated user details
        await user.save();
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: 'User settings updated successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

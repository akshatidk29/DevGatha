import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

// Signup controller
export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        // Check if all required fields are provided
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if password length is valid
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        // Check if email already exists in the database
        const user = await User.findOne({ email });

        if (user) return res.status(400).json({ message: "Email already exists" });

        // Generate a hashed password using bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user object with hashed password
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
        });

        if (newUser) {
            // Generate JWT token for authentication
            generateToken(newUser._id, res);

            // Save the new user to the database
            await newUser.save();

            // Return the created user's details in the response
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        console.log("Error in signup controller", error.message); // Log the error
        res.status(500).json({ message: "Internal Server Error" }); // Send a server error response
    }
}; 

// Login controller
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find user by email in the database
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" }); // Return error if user not found
        }

        // Compare the provided password with the stored hashed password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" }); // Return error if password doesn't match
        }

        // Generate JWT token for authentication
        generateToken(user._id, res);

        // Return the logged-in user's details in the response
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        });
    } catch (error) {
        console.log("Error in login controller", error.message); // Log the error
        res.status(500).json({ message: "Internal Server Error" }); // Send a server error response
    }
};

// Logout controller
export const logout = (req, res) => {
    try {
        // Clear the JWT cookie to log the user out
        res.cookie("jwt", "", { maxAge: 0 });

        // Return success message in the response
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message); // Log the error
        res.status(500).json({ message: "Internal Server Error" }); // Send a server error response
    }
};

// Check authentication status
export const checkAuth = (req, res) => {
    try {
        // Send the authenticated user's data in the response
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth controller", error.message); // Log the error
        res.status(500).json({ message: "Internal Server Error" }); // Send a server error response
    }
};

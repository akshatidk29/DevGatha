import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check", {
                withCredentials: true,  // Ensure cookies are sent with the request
            });
            
            set({ authUser: res.data });
        } catch (error) {
            console.log("Error in checkAuth:", error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data });
            toast.success("Account created successfully");
        } catch (error) {
            toast.error(error.message);
        } finally {
            set({ isSigningUp: false });
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data });
            toast.success("Logged in successfully");
 
        } catch (error) {
            toast.error(error.message);
        } finally {
            set({ isLoggingIn: false });
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logged out successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    saveSnippet: async (data) => {
        set({ isSavingSnippet: true });
        try {
            const res = await axiosInstance.post("/snippets", data); // API endpoint for saving a snippet
            toast.success("Snippet saved successfully!");
            // Optionally update state with the saved snippet if needed
            set((state) => ({
                snippets: [...state.snippets, res.data],
            }));
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to save the snippet"
            );
        } finally {
            set({ isSavingSnippet: false });
        }
    },
    
}));




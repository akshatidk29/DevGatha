import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { addActivity } from "./useActivitiesStore.js";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

export const useSnippetStore = create((set, get) => ({


    handleSaveSnippet: async (data) => {
        try {
            const res = await axiosInstance.post("/snippets/save", data);
            toast.success("Snippet Saved successfully");
            await addActivity(`Saved a Snippet`, `You have recently saved a Snippet.`);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

}))
import { axiosInstance } from "../lib/axios.js";

export const fetchLessons = async () => {
    try {
        const response = await axiosInstance.get("/lessons/get");
        return response.data.lessons;
    } catch (error) {
        throw new Error("Failed to fetch lessons.");
    }
};

export const fetchLessonById = async (id) => {
    try {
        const response = await axiosInstance.get(`/lessons/get/${id}`);
        return response.data.lesson;
    } catch (error) {
        throw new Error("Failed to fetch lesson details.");
    }
};


export const addLesson = async (lessonData) => {
    try {
      const response = await axiosInstance.post("/lessons/add", lessonData);
      return response.data; 
    } catch (error) {
      console.log("error is", error.message);
      throw new Error("Failed to add lesson.");
    }
  };
  
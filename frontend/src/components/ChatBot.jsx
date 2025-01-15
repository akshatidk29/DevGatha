import { useEffect } from "react";
import { axiosInstance } from "../lib/axios.js";
const ChatbotButton = () => {
    useEffect(() => {
        const fetchScriptUrls = async () => {
            try {
                const response = await axiosInstance.get("/chatbot"); // Use axiosInstance for the request
                const data = response.data; // Axios response data

                const injectScript = document.createElement("script");
                const customScript = document.createElement("script");

                injectScript.src = data.injectScript;
                customScript.src = data.customScript;

                injectScript.async = true;
                customScript.async = true;

                document.body.appendChild(injectScript);
                document.body.appendChild(customScript);
            } catch (error) {
                console.error("Failed to load chatbot scripts:", error);
            }
        };

        fetchScriptUrls();
    }, []);

    return null; // No UI needed for this component
};

export default ChatbotButton;

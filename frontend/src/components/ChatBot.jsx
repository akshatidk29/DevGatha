import { useEffect } from "react";

const ChatbotButton = () => {
    useEffect(() => {
        // Remove any existing chatbot scripts if they exist
        const existingInjectScript = document.querySelector('script[src="https://cdn.botpress.cloud/webchat/v2.2/inject.js"]');
        const existingCustomScript = document.querySelector('script[src="https://files.bpcontent.cloud/2025/01/08/08/20250108081033-W820P94D.js"]');
        
        if (existingInjectScript) {
            existingInjectScript.remove();
        }
        if (existingCustomScript) {
            existingCustomScript.remove();
        }

        // Clear chatbot container if any previous session exists
        const chatbotContainer = document.querySelector("#bp-web-widget");
        if (chatbotContainer) {
            chatbotContainer.remove();
        }

        // Inject new scripts for a fresh chatbot
        const injectScript = document.createElement("script");
        const customScript = document.createElement("script");
        injectScript.src = "https://cdn.botpress.cloud/webchat/v2.2/inject.js";
        customScript.src = "https://files.bpcontent.cloud/2025/01/08/08/20250108081033-W820P94D.js";
        injectScript.async = true;
        customScript.async = true;

        document.body.appendChild(injectScript);
        document.body.appendChild(customScript);

    }, []);

    return null; // No UI needed for this component
};

export default ChatbotButton;

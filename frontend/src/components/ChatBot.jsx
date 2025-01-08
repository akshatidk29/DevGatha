import { useEffect } from "react";

const ChatbotButton = () => {
    useEffect(() => {

        const injectScript = document.createElement("script");
        const customScript = document.createElement("script");
        injectScript.src = "https://cdn.botpress.cloud/webchat/v2.2/inject.js";
        customScript.src = "https://files.bpcontent.cloud/2025/01/08/08/20250108081033-W820P94D.js";
        injectScript.async = true;
        customScript.async = true;

        document.body.appendChild(injectScript);
        document.body.appendChild(customScript);

    }, []);

};

export default ChatbotButton;

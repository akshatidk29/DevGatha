import { useState } from "react";
import Editor from "@monaco-editor/react";
import { useSnippetStore } from "../store/useSnippetStore"; // Adjust the import based on your store setup
import toast from "react-hot-toast";

const EditorPage = () => {
  const { handleSaveSnippet } = useSnippetStore(); // Access the save function from your store

  const [language, setLanguage] = useState("javascript");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [title, setTitle] = useState(""); // New state to manage the title of the snippet

  // Store code for each language
  const [languageCode, setLanguageCode] = useState({
    javascript: `console.log('Hello, World!');`,
    python: `print('Hello, World!')`,
    c: `#include <stdio.h>\n\nint main() {\n\tprintf("Hello, World!\\n");\n\treturn 0;\n}`,
    cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n\tcout << "Hello, World!" << endl;\n\treturn 0;\n}`,
  });

  const handleEditorChange = (value) => {
    setLanguageCode((prev) => ({
      ...prev,
      [language]: value, // Save the code for the current language
    }));
  };

  const handleRunCode = async () => {
    try {
      setOutput("Running..."); // Display "Running..." in the output window
      const response = await fetch("http://localhost:5001/api/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language: language,
          code: languageCode[language],
          input: input, // Include input
        }),
      });
      const data = await response.json();
      console.log(data.stderr);
      console.log(data);

      if (data.status === "Accepted") {
        toast.success("Code ran successfully!");
        setOutput(data.stdout || ""); // Set stdout in the output box
      } else {
        toast.error("Code execution failed!");
        setOutput(data.stderr);
      }
    } catch (error) {
      setOutput("Error: " + error.message);
    }
  };

  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;
    setLanguage(newLanguage);
  };

  const handleSave = () => {
    if (title.trim() === "") {
      toast.error("Please provide a title for the snippet.");
      return;
    }
    const snippetData = {
      title: title,
      code: languageCode[language],
      language: language,
    };
    handleSaveSnippet(snippetData); // Save the snippet using the store
  };

  return (
    <div className="flex flex-col h-screen mt-16 dark:bg-slate-900">
      <div className="flex h-full">
        {/* Code Editor Section */}
        <div className="w-3/5 p-4 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <h2 className="text-lg font-bold dark:text-white">Code</h2>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="ml-4 px-3 py-2 rounded-2xl border border-black dark:bg-transparent dark:border-white dark:text-white"
                placeholder="Title"
              />
            </div>
            <div className="flex items-center">
              <select
                value={language}
                onChange={handleLanguageChange}
                className="px-3 py-2 rounded-xl border border-black dark:border-white mr-2 dark:bg-transparent dark:text-white"
              >
                <option value="c" className="border rounded-3xl dark:bg-slate-900 dark:text-white">
                  C
                </option>
                <option value="cpp" className="border rounded-3xl dark:bg-slate-900 dark:text-white">
                  C++
                </option>
                <option value="python" className="border rounded-3xl dark:bg-slate-900 dark:text-white">
                  Python
                </option>
                <option value="javascript" className="border rounded-3xl dark:bg-slate-900 dark:text-white">
                  JavaScript
                </option>
              </select>
              <button
                onClick={handleRunCode}
                className="mr-4 px-4 py-2 rounded-2xl border border-black text-black dark:border-white hover:bg-red-300 dark:text-white dark:bg-transparent dark:hover:bg-red-800"
              >
                Run Code
              </button>
              <button
                onClick={handleSave}
                className="bg-green-400 border border-black text-white px-2 py-2 rounded-2xl hover:bg-green-600"
              >
                Save Snippet
              </button>
            </div>
          </div>
          <div className="flex-grow">
            <Editor
              height="80%"
              theme="vs-dark"
              value={languageCode[language]} // Set editor value based on language
              onChange={handleEditorChange}
              language={language}
              options={{
                automaticLayout: true,
                minimap: { enabled: false },
                wordWrap: "on",
              }}
            />
          </div>
        </div>

        {/* Input and Output Section */}
        <div className="w-2/5 p-4 flex flex-col justify-between mt-4">
          <div className="flex-1">
            <h2 className="text-lg font-bold mb-2 dark:text-white">Input</h2>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full h-5/6 px-4 py-2 rounded-2xl border border-black dark:border-gray-300 bg-gray-100 dark:bg-transparent dark:text-white"
              placeholder="Enter input here..."
            />
          </div>
          <div className="flex-1 mt-4">
            <h2 className="text-lg font-bold mb-2 dark:text-white">Output</h2>
            <textarea
              value={output}
              className="w-full h-3/6 px-4 py-2 rounded-2xl border border-black dark:border-gray-300 bg-gray-100 dark:bg-transparent dark:text-white"
              placeholder="Output..."
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorPage;

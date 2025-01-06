import { useState } from "react";
import Editor from "@monaco-editor/react";
import { useSnippetStore } from "../store/useSnippetStore"; // Adjust the import based on your store setup
import toast from "react-hot-toast";
const EditorPage = () => {
  const { handleSaveSnippet } = useSnippetStore(); // Access the save function from your store

  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [title, setTitle] = useState(""); // New state to manage the title of the snippet

  const handleEditorChange = (value) => {
    setCode(value);
  };

  const handleRunCode = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: code,
          language: language,
        }),
      });

      const data = await response.json();
      if (data.output) {
        toast.success("Running...");
        setOutput(data.output); // Display the output in the output section
      } else {
        setOutput("Error: Unable to run the code.");
      }
    } catch (error) {
      setOutput("Error: " + error.message);
    }
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
    setCode(getBoilerplateCode(event.target.value)); // Reset to boilerplate code
  };

  const getBoilerplateCode = (language) => {
    switch (language) {
      case 'javascript':
        return `console.log('Hello, World!');`;
      case 'python':
        return `print('Hello, World!')`;
      case 'java':
        return `public class Main { public static void main(String[] args) { System.out.println("Hello, World!"); } }`;
      case 'c':
        return `#include <stdio.h>\n\nint main() {\n\tprintf("Hello, World!\\n");\n\treturn 0;\n}`;
      case 'cpp':
        return `#include <iostream>\n\nint main() {\n\tstd::cout << "Hello, World!" << std::endl;\n\treturn 0;\n}`;
      default:
        return '';
    }
  };

  const handleSave = () => {
    if (title.trim() === "") {
      alert("Please provide a title for the Snippet."); // Or you can use toast.error() if you have react-hot-toast set up
      return;
    }
    const snippetData = {
      title: title,
      code: code,
      language: language,
    };
    handleSaveSnippet(snippetData); // Save the Sippet using the store
  };

  return (
    <div className="flex flex-col h-screen mt-16">
      <div className="flex h-full">
        {/* Code Editor Section */}
        <div className="w-3/5 p-4 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <h2 className="text-lg font-bold">Code</h2>
              {/* Title input field */}
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="ml-4 px-3 py-2 rounded-md border border-gray-300"
                placeholder="Title"
              />
            </div>
            <div className="flex items-center">
              <select
                value={language}
                onChange={handleLanguageChange}
                className="px-3 py-2 rounded-md border border-gray-300 mr-2"
              >
                <option value="c">C</option>
                <option value="cpp">C++</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="javascript">JavaScript</option>
              </select>
              <button
                onClick={handleRunCode}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Run Code
              </button>
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600"
              >
                Save Snippet
              </button>
            </div>
          </div>
          <div className="flex-grow">
            <Editor
              height="80%"
              theme="vs-dark"
              value={code}
              onChange={handleEditorChange}
              language={language}
              options={{
                automaticLayout: true,
                minimap: { enabled: false }, // Optional: Disable minimap for a cleaner UI
                wordWrap: "on", // Optional: Wrap words to fit within the editor width
              }}
            />
          </div>
        </div>

        {/* Input and Output Section */}
        <div className="w-2/5 p-4 flex flex-col justify-between mt-4">
          <div className="flex-1">
            <h2 className="text-lg font-bold mb-2">Input</h2>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full h-auto px-4 py-2 rounded-md border border-gray-300 bg-gray-100"
              placeholder="Enter input here..."
            />
          </div>
          <div className="flex-1 mt-4">
            <h2 className="text-lg font-bold mb-2">Output</h2>
            <textarea
              value={output}
              className="w-full h-auto px-4 py-2 rounded-lg border border-gray-300 bg-gray-100"
              placeholder="Output..."
            />
          </div>
        </div>
      </div>

    </div>
  );
};

export default EditorPage;


import express from "express";
import { exec } from "child_process";
import fs from "fs";

const router = express.Router();
const runCode = (code, language) => {
    return new Promise((resolve, reject) => {
        let command;

        // Create command based on the selected language
        switch (language) {
            case "javascript":
                command = `node -e "${code}"`;
                break;
            case "python":
                command = `python -c "${code.replace(/(["\\])/g, '\\$1')}"`; // Escapes quotes and backslashes
                break;
            case "java":
                command = `echo "${code}" > Main.java && javac Main.java && java Main`;
                break;
            case "c":
                const tempFilePath1 = './code.c';
                fs.writeFileSync(tempFilePath1, code); // Write code to file
                // Use .exe for Windows to run compiled C++ code
                command = `gcc ${tempFilePath1} -o code.exe && code.exe`;
                break;
            case "cpp":
                const tempFilePath = './code.cpp';
                fs.writeFileSync(tempFilePath, code); // Write code to file
                // Use .exe for Windows to run compiled C++ code
                command = `g++ ${tempFilePath} -o code.exe && code.exe`;
                break;
            default:
                reject("Unsupported language");
                return;
        }

        // Execute the command and capture the output
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error("Execution error:", error);
                reject({
                    message: `Error: ${stderr || error.message}`,
                    details: error,
                });
            } else {
                if (stderr) {
                    console.error("stderr:", stderr);
                    reject({
                        message: `stderr: ${stderr}`,
                        details: stderr,
                    });
                } else {
                    resolve({ output: stdout });
                }
            }
        });
    });
};



router.post("/", async (req, res) => {
    const { code, language } = req.body;

    try {
        const result = await runCode(code, language);
        res.json(result);

    } catch (err) {
        res.status(500).json({ error: err });
        console.log("Hello");
    }
});

export default router;
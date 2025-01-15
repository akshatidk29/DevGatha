import express from "express";
import axios from "axios";
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const JUDGE0_URL = 'https://judge0-ce.p.rapidapi.com/submissions';
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;

router.post('/', async (req, res) => {
    console.log("Correct");
    const { language, code, input } = req.body;

    const languageIdMap = {
        python: 71,
        javascript: 63,
        c: 50,
        cpp: 54,
    };

    const languageId = languageIdMap[language];
    if (!languageId) {
        return res.status(400).json({ error: 'Unsupported language' });
    }

    try {
        const submissionResponse = await axios.post(
            JUDGE0_URL,
            {
                source_code: code,
                language_id: languageId,
                stdin: input,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-RapidAPI-Key': RAPIDAPI_KEY,
                },
            }
        );

        const token = submissionResponse.data.token;

        let executionResult;
        let attempts = 0;
        const maxAttempts = 10;

        do {
            executionResult = await axios.get(`${JUDGE0_URL}/${token}`, {
                headers: {
                    'X-RapidAPI-Key': RAPIDAPI_KEY,
                },
            });
            attempts++;
            if (attempts >= maxAttempts) {
                throw new Error('Execution timed out');
            }
            await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second before retrying
        } while (executionResult.data.status.id <= 2);
        res.json({
            stdout: executionResult.data.stdout ,
            stderr: executionResult.data.stderr ,
            compile_output: executionResult.data.compile_output ,
            time: executionResult.data.time,
            memory: executionResult.data.memory,
            status: executionResult.data.status.description,
        });

    } catch (error) {
        res.status(500).json({ error: 'Code execution failed', details: error.message });
    }
});

export default router;

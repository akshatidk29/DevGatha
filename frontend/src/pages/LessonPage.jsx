import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { fetchLessonById } from "../store/useLessonsStore";

const LessonPage = () => {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    const loadLesson = async () => {
      try {
        const lessonData = await fetchLessonById(id);
        setLesson(lessonData);
      } catch (error) {
        toast.error("Failed to load lesson details.");
      }
    };

    loadLesson();
  }, [id]);

  if (!lesson) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 mt-24">
      <h1 className="text-3xl font-bold mb-4">{lesson.title}</h1>
      <p className="text-gray-600 mb-6">Language: {lesson.language}</p>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Content</h2>
        <p>{lesson.content}</p>
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Examples</h2>
        {lesson.examples.length > 0 ? (
          lesson.examples.map((example, index) => (
            <div key={index} className="p-4 bg-gray-100 rounded-md mb-4">
              <pre>{example}</pre>
            </div>
          ))
        ) : (
          <p>No examples provided.</p>
        )}
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-2">Practice Questions</h2>
        {lesson.questions.length > 0 ? (
          <ul className="list-disc pl-6">
            {lesson.questions.map((question, index) => (
              <li key={index}>{question}</li>
            ))}
          </ul>
        ) : (
          <p>No questions available.</p>
        )}
      </div>
    </div>
  );
};

export default LessonPage;

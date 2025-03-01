import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchLessonById } from "../store/useLessonsStore";
import toast from "react-hot-toast";

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
    <div className="container  mx-auto px-4 mt-16 pt-6 dark:bg-slate-900 dark:text-white">
      <h1 className="text-3xl font-semibold mb-2  dark:text-white" >
        {lesson.title}
      </h1>

      <pre className="text-gray-800 mb-6 dark:text-gray-300">Language: {lesson.language}</pre>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 ">Content</h2>
        {lesson.content.length > 0 ? (
          lesson.content.map((example, index) => (
            <div key={index}>
              <p className="dark:text-gray-100">{example}</p>
            </div>
          ))) : (
          <p className="text-gray-600">No Content provided.</p>
        )}
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-8">Examples</h2>
        {lesson.examples.length > 0 ? (
          lesson.examples.map((example, index) => (
            <div key={index} className="p-6  rounded-3xl border border-black dark:border-cyan-200 shadow-lg mb-6 bg-gray-300 dark:bg-gray-300">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{example.description}</h3> {/* Bold and nice font size */}

                <pre className="bg-gray-800 text-white p-4 rounded-3xl shadow-inner">{example.code}</pre> {/* Soft background for code */}

                <pre className="bg-gray-100 text-gray-800 p-4 rounded-3xl mt-2 shadow-inner">{example.output}</pre> {/* Soft background for output */}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No examples provided.</p>
        )}


      </div>
      <div className="pb-20">
        <h2 className="text-3xl font-semibold mt-12 mb-6">Practice Questions</h2>
        {lesson.questions.length > 0 ? (
          <ul className="list-none pl-6 ">
            {lesson.questions.map((question, index) => (
              <li className="bg-slate-800 w-fit text-white  dark:bg-gray-300 mb-4 rounded-2xl dark:text-black text-lg dark:font-semibold p-2 px-4" key={index}>Q{index + 1}   -  {question}</li>
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

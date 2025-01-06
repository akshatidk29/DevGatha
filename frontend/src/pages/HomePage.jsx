import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { fetchLessons, addLesson } from "../store/useLessonsStore.js";

const HomePage = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(null);
  const [error, setError] = useState(null);

  const [snippets, setSnippets] = useState([]);
  const [isSnippetsFetched, setIsSnippetsFetched] = useState(false);
  const [lessons, setLessons] = useState([]);

  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
  const [password, setPassword] = useState("");
  const [lessonData, setLessonData] = useState("");
  const [showModal, setShowModal] = useState(false);

  const correctPassword = "iamam"; // Replace with your actual password

  const handlePasswordSubmit = () => {
    if (password === correctPassword) {
      setIsPasswordCorrect(true);
      setShowModal(false);
      toast.success("You can now add a Lesson.");
    } else {
      toast.error("Incorrect Password.");
    }
  };
  const handleAddLesson = async () => {
    try {
      const newLesson = JSON.parse(lessonData); // Parse the lesson data input by the user
      const result = await addLesson(newLesson);

      console.log("Lesson added successfully:", result);
      setLessons([...lessons, newLesson]);
      setLessonData("");
      toast.success("Lesson added successfully!");
    } catch (error) {
      // Handle any errors, including invalid JSON format or failed API request
      console.error("Error adding lesson:", error);
      toast.error("Failed to add lesson. Please check your input and try again.");
    }
  };


  useEffect(() => {
    const loadLessons = async () => {
      try {
        const lessonData = await fetchLessons();
        setLessons(lessonData);
      } catch (error) {
        toast.error("Failed to load lessons.");
      }
    };
    const fetchProgress = async () => {
      try {
        const response = await axiosInstance.get(`/progress`);
        setProgress(response.data.progress);
        setError(null); // Clear any previous errors
      } catch (err) {
        console.error("Error fetching progress:", err);
        setError("Failed to load progress. Please try again.");
      }
    };

    loadLessons();
    fetchProgress();
  }, []);

  const handleViewLesson = (id) => {
    navigate(`/lessons/get/${id}`);
  };


  const fetchSnippets = async () => {
    try {
      const response = await axiosInstance.get("/snippets/fetch");
      // If successful, set the snippets data
      setSnippets(response.data.snippets);
      setIsSnippetsFetched(true); // Set to true when snippets are fetched
      toast.success("Snippets fetched successfully");
    } catch (error) {
      // Handle error gracefully
      toast.error(error.message);
    }
  };

  const handleRedirect = () => {
    navigate("/editor");
  };

  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      setShowModal(false); // Close modal when clicking outside
    }
  };
  return (
    <div className="container mx-auto px-4 mt-24">
      {/* Welcome Section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Welcome to CodeTutor</h1>
        <p className="text-gray-600">
          Learn, practice, and master programming with AI-guided tutoring.
        </p>
        <button
          onClick={handleRedirect}
          className="btn btn-primary mt-6"
        >
          Start Coding in the Editor
        </button>
      </div>

      {/* Learning Progress Section */}
      <section className="my-12">
        <h2 className="text-2xl font-semibold mb-4">Your Learning Progress</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="cursor-pointer">
  <Link to="/lessons/python">
    <div
      className={`p-4 border rounded-lg shadow-md transition-all ${
        progress && progress.python.completedLessons === progress.python.totalLessons
          ? "bg-green-100 hover:bg-green-200"
          : "bg-blue-100 hover:bg-blue-200"
      }`}
    >
      <h3 className="text-lg">Python</h3>
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className="h-4 rounded-full bg-green-500 transition-all duration-300"
          style={{
            width: `${progress ? (progress.python.completedLessons / progress.python.totalLessons) * 100 : 0}%`,
          }}
        ></div>
      </div>
      <p className="text-sm text-gray-600">
        {progress
          ? `${progress.python.completedLessons} of ${progress.python.totalLessons} lessons completed`
          : "Loading progress..."}
      </p>
    </div>
  </Link>
</div>
<div className="cursor-pointer">
  <Link to="/lessons/cpp">
    <div
      className={`p-4 border rounded-lg shadow-md transition-all ${
        progress && progress.cpp.completedLessons === progress.cpp.totalLessons
          ? "bg-green-100 hover:bg-green-200"
          : "bg-blue-100 hover:bg-blue-200"
      }`}
    >
      <h3 className="text-lg">Cpp</h3>
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className="h-4 rounded-full bg-green-500 transition-all duration-300"
          style={{
            width: `${progress ? (progress.cpp.completedLessons / progress.cpp.totalLessons) * 100 : 0}%`,
          }}
        ></div>
      </div>
      <p className="text-sm text-gray-600">
        {progress
          ? `${progress.cpp.completedLessons} of ${progress.cpp.totalLessons} lessons completed`
          : "Loading progress..."}
      </p>
    </div>
  </Link>
</div>
<div className="cursor-pointer">
  <Link to="/lessons/c">
    <div
      className={`p-4 border rounded-lg shadow-md transition-all ${
        progress && progress.c.completedLessons === progress.c.totalLessons
          ? "bg-green-100 hover:bg-green-200"
          : "bg-blue-100 hover:bg-blue-200"
      }`}
    >
      <h3 className="text-lg">C</h3>
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className="h-4 rounded-full bg-green-500 transition-all duration-300"
          style={{
            width: `${progress ? (progress.c.completedLessons / progress.c.totalLessons) * 100 : 0}%`,
          }}
        ></div>
      </div>
      <p className="text-sm text-gray-600">
        {progress
          ? `${progress.c.completedLessons} of ${progress.c.totalLessons} lessons completed`
          : "Loading progress..."}
      </p>
    </div>
  </Link>
</div>


        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="my-12">
        <h2 className="text-2xl font-semibold mb-4">Featured Lessons</h2>
        <button
          onClick={() => setShowModal(true)}
          className="btn btn-primary m-2 mt-0"
        >
          Add Lesson
        </button>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.length > 0 ? (
            lessons.slice(0, 6).map((lesson) => (  // Limit to 6 lessons
              <div
                key={lesson._id}
                className="p-4 border rounded-lg shadow-md bg-white"
              >
                <h3 className="text-lg font-medium">{lesson.title}</h3>
                <p className="text-sm text-gray-500 mb-2">
                  Language: {lesson.language}
                </p>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => handleViewLesson(lesson._id)}
                >
                  View Lesson
                </button>
              </div>
            ))
          ) : (
            <p>No lessons available.</p>
          )}
        </div>
      </section>

      {/* Modal for password input */}
      {showModal && !isPasswordCorrect && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50" onClick={handleClickOutside}>
          <div className="bg-white p-6 rounded-md shadow-md">
            <h3 className="text-lg font-semibold mb-4">Only for Developer Team...</h3>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 mb-4 w-full"
              placeholder="Enter Security Key"
            />
            <button
              onClick={handlePasswordSubmit}
              className="btn btn-primary"
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {/* Add Lesson Form */}
      {isPasswordCorrect && (
        <section className="my-12">
          <h2 className="text-2xl font-semibold mb-4">Add a New Lesson</h2>
          <textarea
            value={lessonData}
            onChange={(e) => setLessonData(e.target.value)}
            className="w-full h-40 p-4 border rounded-md"
            placeholder='Enter the lesson in JSON format: {"title": "New Lesson", "language": "Python", "content": "..."}'
          ></textarea>
          <button
            onClick={handleAddLesson}
            className="btn btn-primary mt-4"
          >
            Add Lesson
          </button>
        </section>
      )}

      <button
        onClick={fetchSnippets}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        View My Snippets
      </button>

      <div className="snippets-list p-4 mt-4">
        {isSnippetsFetched && snippets.length === 0 ? (
          <div className="no-snippets text-center p-4 border rounded-lg bg-gray-200">
            <p>No Snippets Available</p>
          </div>
        ) : (
          snippets.map((snippet) => (
            <div key={snippet._id} className="snippet-box mb-4 p-4 border rounded-lg shadow-lg">
              <h3 className="snippet-title text-xl font-semibold mb-2">{snippet.title}</h3>
              {/* Display language */}
              <p className="snippet-language text-sm text-gray-500 mb-2">Language: {snippet.language}</p>
              <pre className="snippet-code bg-gray-100 p-4 rounded-md">{snippet.code}</pre>
            </div>
          ))
        )}
      </div>

    </div >
  );
};

export default HomePage;

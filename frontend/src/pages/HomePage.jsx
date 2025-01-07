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
    <div className="container mx-auto px-4 pt-4   w-full mt-16 bg-white dark:bg-gray-900 text-black dark:text-white">

      {/* Welcome Section  */}
      <div className="text-left ">

        <h1 className="text-4xl font-bold  mb-4 " style={{ fontFamily: "Verdana" }}>
          Welcome to CodeTutor
        </h1>

        <p style={{ fontFamily: "cursive" }}>
          Learn, practice, and master programming with AI-guided tutoring.
        </p>

        <button
          onClick={handleRedirect}
          className="btn btn-primary mt-6 rounded-3xl bg-black dark:bg-white   dark:text-black"  >
          Start Coding in the Editor
        </button>

      </div>

      {/* Learning Progress Section */}

      <section className="my-12">

        <h2 className="text-2xl font-semibold mb-4">
          Your Learning Progress
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="cursor-pointer">
            <Link to="/lessons/python">
              <div
                className={`p-4 border rounded-3xl shadow-md transition-all ${progress && progress.python.totalLessons > 0 && progress.python.completedLessons === progress.python.totalLessons
                  ? "font-bold bg-white border-lime-950 text-green-800   hover:bg-green-400   hover:text-blue-800                   dark:bg-green-700 dark:text-white dark:hover:bg-white dark:hover:text-black"
                  : "font-bold bg-white border-lime-950 text-black   hover:bg-gray-300  hover:text-blue-800                   dark:bg-gray-400 dark:text-white dark:hover:bg-white dark:hover:text-black"
                  }`}
              >
                <h3 className="text-2xl " style={{ fontFamily: "cursive" }}>Python</h3>
                <progress className="progress w-56" value={progress ? (progress.python.completedLessons / progress.python.totalLessons) * 100 : 0} max="100"></progress>
                <p className="text-sm text-black dark:text-white dark:hover:text-black">
                  {progress
                    ? `${(progress.python.completedLessons || 0)} of ${(progress.python.totalLessons || 0)} lessons completed`
                    : "Loading progress..."}
                </p>
              </div>
            </Link>
          </div>
          <div className="cursor-pointer">
            <Link to="/lessons/cpp">
              <div
                className={`p-4 border rounded-3xl shadow-md transition-all ${progress && progress.cpp.totalLessons > 0 && progress.cpp.completedLessons === progress.cpp.totalLessons

                  ? "font-bold bg-white border-lime-950 text-green-800   hover:bg-green-400   hover:text-blue-800                   dark:bg-green-700 dark:text-white dark:hover:bg-white dark:hover:text-black"
                  : "font-bold bg-white border-lime-950 text-black   hover:bg-gray-300  hover:text-blue-800                   dark:bg-gray-400 dark:text-white dark:hover:bg-white dark:hover:text-black"
                  }`}
              >
                <h3 className="text-2xl " style={{ fontFamily: "cursive" }}>Cpp</h3>
                <progress className="progress w-56" value={progress ? (progress.cpp.completedLessons / progress.cpp.totalLessons) * 100 : 0} max="100"></progress>
                <p className="text-sm text-black dark:text-white dark:hover:text-black">
                  {progress
                    ? `${(progress.cpp.completedLessons || 0)}  of ${(progress.cpp.totalLessons || 0)} lessons completed`
                    : "Loading progress..."}
                </p>
              </div>
            </Link>
          </div>
          <div className="cursor-pointer">
            <Link to="/lessons/c">
              <div
                className={`p-4 border rounded-3xl shadow-md transition-all ${progress && progress.c.totalLessons > 0 && progress.c.completedLessons === progress.c.totalLessons
                  ? "font-bold bg-white border-lime-950 text-green-800   hover:bg-green-400   hover:text-blue-800                   dark:bg-green-700 dark:text-white dark:hover:bg-white dark:hover:text-black"
                  : "font-bold bg-white border-lime-950 text-black   hover:bg-gray-300  hover:text-blue-800                   dark:bg-gray-400 dark:text-white dark:hover:bg-white dark:hover:text-black"
                  }`}
              >
                <h3 className="text-2xl " style={{ fontFamily: "cursive" }}>C</h3>
                <progress className="progress w-56" value={progress ? (progress.c.completedLessons / progress.c.totalLessons) * 100 : 0} max="100"></progress>
                <p className="text-sm text-black dark:text-white dark:hover:text-black">
                  {progress
                    ? `${(progress.c.completedLessons || 0)} of ${(progress.c.totalLessons || 0)} lessons completed`
                    : "Loading progress..."}
                </p>
              </div>
            </Link>
          </div>


        </div>
      </section>

      {/* Featured Courses Section */}

      <section className="my-12">

        <h2 className="text-2xl font-semibold mb-4">
          Featured Lessons
        </h2>

        <button onClick={() => setShowModal(true)} className="mt-0 mb-4 font-bold text-sm btn btn-primary rounded-3xl  bg-black dark:bg-white   dark:text-black"  >
          Add Lesson
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {lessons.length > 0 ? (
            lessons.slice(0, 6).map((lesson) => (  // Limit to 6 lessons

              <div key={lesson._id} className="p-4 border rounded-3xl shadow-md border-black bg-blue-200 dark:border-white dark:bg-gray-700" >

                <h3 className="text-lg font-medium">{lesson.title}</h3>

                <p className="text-sm text-gray-700 mb-2 dark:text-white">
                  Language: {lesson.language}
                </p>

                <button className="btn btn-sm btn-primary rounded-2xl text-white bg-blue-700  dark:bg-green-600" onClick={() => handleViewLesson(lesson._id)} >
                  View Lesson
                </button>

              </div>)))

            : (<p>  No lessons available. </p>

            )}
        </div>

      </section>

      {/* Modal for password input */}
      {showModal && !isPasswordCorrect && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50" onClick={handleClickOutside}>

          <div className="bg-white p-6 rounded-3xl shadow-md" >

            <h3 className="text-lg font-semibold mb-4 dark:text-black" style={{ fontFamily: "cursive" }}>
              Only for Developer Team...
            </h3>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 mb-4 w-full rounded-2xl"
              placeholder="Enter Security Key" />

            <button onClick={handlePasswordSubmit} className="btn btn-primary bg-gray-600 rounded-3xl" >
              Submit
            </button>

          </div>

        </div>
      )}

      {/* Add Lesson Form */}

      {isPasswordCorrect && (
        <section className="my-12">
          <h2 className="text-xl font-semibold mb-3">
            Add a New Lesson
          </h2>

          <textarea
            value={lessonData}
            onChange={(e) => setLessonData(e.target.value)}
            className="w-full h-40 p-4 border rounded-2xl"
            placeholder='Enter the lesson in JSON format: {"title": "New Lesson", "language": "Python", "content": "..."}' >
          </textarea>

          <button
            onClick={handleAddLesson}
            className="btn btn-primary mt-4  border-black bg-red-700 rounded-3xl hover:bg-green-500">
            Add Lesson
          </button>

        </section>
      )}



      {/* View My Snippets */}
      <h2 className="text-2xl font-semibold mb-4">
        Saved Snippets..
      </h2>

      <button
        onClick={fetchSnippets}
        className="bg-black text-white px-4 py-2 rounded-2xl hover:bg-gray-600" >
        View My Snippets
      </button>

      <div className="snippets-list p-4 mt-4">

        {isSnippetsFetched && snippets.length === 0 ? (

          <div className="no-snippets text-center p-4 border rounded-lg bg-gray-200">
            <p>No Snippets Available</p>
          </div>) : (

          snippets.map((snippet) => (

            <div key={snippet._id} className="snippet-box mb-4 p-4 border border-black rounded-2xl shadow-lg dark:bg-gray-100">

              <h3 className="snippet-title text-xl font-semibold mb-2 dark:text-black">
                {snippet.title}
              </h3>

              {/* Display language */}
              <p className="snippet-language text-sm text-gray-900 dark:text-black mb-2">
                Language: {snippet.language}
              </p>

              <pre className="snippet-code bg-gray-300 p-4 rounded-3xl dark:bg-slate-700 dark:text-white">
                {snippet.code}
              </pre>

            </div>)))}

      </div>

    </div >
  );
};

export default HomePage;

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import EditorPage from "./pages/EditorPage";
import LessonPage from "./pages/LessonPage";
import AllLessonPage from "./pages/AllLessonPage";
import { Toaster } from "react-hot-toast";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";

import { useEffect } from "react";
import { LoaderCircle } from 'lucide-react';
import Footer from "./components/Footer";
import ProfilePage from "./pages/ProfilePage";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });
  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoaderCircle className="size-50 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <Toaster position="top-center" toastOptions={{ duration: 1000, style: { background: "black", color: "white" } }} />
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/editor" element={authUser ? <EditorPage /> : <Navigate to="/" />} />
        <Route path="/settings" element={authUser ? <SettingsPage /> : <Navigate to="/" />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
        <Route path="/lessons/get/:id" element={authUser ? <LessonPage /> : <Navigate to="/login" />} />
        <Route path="/lessons/:language" element={authUser ? <AllLessonPage /> : <Navigate to="/login" />} />

      </Routes>

      <Footer />


    </div>
  )
}

export default App

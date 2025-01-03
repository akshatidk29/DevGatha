import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { LoaderCircle } from 'lucide-react';

const App = () => {
  // const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  // useEffect(() => {
  //   checkAuth();
  // }, [checkAuth]);

  // console.log({ authUser });
  // if (isCheckingAuth && !authUser) {
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       <LoaderCircle className="size-50 animate-spin" />
  //     </div>
  //   );
  // }

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>


    </div>
  )
}

export default App

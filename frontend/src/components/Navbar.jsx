import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, Settings, User, BugOff } from "lucide-react";
import ThemeSwitcher from "./themeSwitcher";
import ChatBot from "./ChatBot";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-white dark:bg-gray-900 text-black dark:text-white">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          {/* Logo and User Information */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              {/* Logo Icon */}
              <div className="size-9 rounded-lg bg-slate-800 flex items-center justify-center">
                <BugOff className="w-full h-full bg-white dark:bg-gray-900 dark:text-white" />
              </div>
              <div className="flex gap-2">
                {/* App Name and Welcome Message */}
                <h1 className="text-lg font-bold" style={{ fontFamily: "cursive" }}>DevGatha</h1>
                {authUser && (
                  <span className="textarea-xs font-medium text-slate-600 dark:text-white" style={{ fontFamily: "Verdana" }}>
                    Hello, {authUser.fullName || "User"}
                  </span>
                )}
              </div>
            </Link>
          </div>

          {/* Theme Switcher Component */}
          <ThemeSwitcher />

          {/* Show ChatBot only when the user is authenticated */}
          {authUser && <ChatBot />}

          {/* Navigation Links for Authenticated Users */}
          <div className="flex items-center gap-4">
            {authUser && (
              <>
                {/* Settings Link */}
                <Link
                  to="/settings"
                  className="btn btn-sm gap-2 transition-colors border-black rounded-xl"
                >
                  <Settings className="w-4 h-4" />
                  <span className="hidden sm:inline">Settings</span>
                </Link>
              </>
            )}

            {authUser && (
              <>
                {/* Profile Link */}
                <Link to="/profile" className="btn btn-sm gap-2 border-black rounded-xl">
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                {/* Logout Button */}
                <button className="flex gap-2 items-center" onClick={logout}>
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, BugOff } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="h-screen grid lg:grid-cols-2 mt-6 py-12 pl-2 dark:bg-slate-900">

      <div className="flex flex-col justify-center items-center p-6 sm:p-12 border border-black shadow-xl dark:border-cyan-300 rounded-full">

        <div className="w-full max-w-md space-y-2">
          <div className="text-center mb-2">
            <div className="flex flex-col items-center gap-2 group">
 
              <div className="w-12 h-12 rounded-xl flex items-center justify-center " >
                <BugOff className="size-10  text-black dark:text-white" />
              </div>

              <h1 className="text-2xl font-bold mt-0  dark:text-white">Welcome Back</h1>
              <p className="text-base-content/60  dark:text-gray-100">Sign in to your account</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 text-center">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold dark:text-white">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-base-content/40  dark:text-white" />
                </div>
                <input
                  type="email"
                  className={`input input-md rounded-2xl input-bordered w-full pl-10 border-black dark:bg-transparent dark:border-cyan-200 dark:text-white`}
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold dark:text-white">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-base-content/40  dark:text-white" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-md rounded-2xl input-bordered w-full pl-10 border-black dark:bg-transparent dark:border-cyan-200 dark:text-white`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-base-content/40 dark:text-white" />
                  ) : (
                    <Eye className="h-5 w-5 text-base-content/40 dark:text-white" />
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-25  rounded-3xl bg-black dark:bg-black hover:bg-white hover:text-black dark:hover:bg-white dark:hover:text-black" disabled={isLoggingIn}>
              {isLoggingIn ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60 dark:text-white">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="link link-primary  dark:text-white dark:hover:text-yellow-100">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
export default LoginPage;

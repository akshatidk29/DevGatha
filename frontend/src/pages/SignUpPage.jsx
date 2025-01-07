import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, User, BugOff } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) signup(formData);
  };

  return (

    <div className="min-h-screen grid lg:grid-cols-2 mt-6 py-12 pl-2 dark:bg-slate-900">

      <div className="flex flex-col justify-center items-center p-6 sm:p-12 border border-black shadow-xl dark:border-cyan-300 rounded-full">

        <div className="w-full max-w-md space-y-2">
          <div className="text-center mb-2">
            <div className="flex flex-col items-center gap-2 group">

              <div
                className="size-12 rounded-xl flex items-center justify-center " >
                <BugOff className="size-10  text-black dark:text-white" />
              </div>

              <h1 className="text-2xl font-bold mt-0 dark:text-white">Create Account</h1>
              <p className="text-base-content/60 dark:text-gray-100">Get started with your Account</p>

            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-0 text-center">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold dark:text-white">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40 dark:text-white" />
                </div>
                <input
                  type="text"
                  className={`input input-md rounded-2xl input-bordered w-full pl-10 border-black dark:bg-transparent dark:border-cyan-200 dark:text-white`}
                  placeholder="Akshat"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold dark:text-white">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40 dark:text-white" />
                </div>
                <input
                  type="email"
                  className={`input input-bordered rounded-2xl w-full pl-10 border-black dark:bg-transparent dark:border-cyan-200 dark:text-white`}
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium dark:text-white">Password</span>
              </label>
              <div className="relative mb-3">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40 dark:text-white" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered rounded-2xl w-full pl-10 border-black dark:bg-transparent dark:border-cyan-200 dark:text-white`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40 dark:text-white" />
                  ) : (
                    <Eye className="size-5 text-base-content/40 dark:text-white" />
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-25  rounded-3xl bg-black dark:bg-black hover:bg-white hover:text-black dark:hover:bg-white dark:hover:text-black" disabled={isSigningUp}>
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60 dark:text-white">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary dark:text-white dark:hover:text-yellow-100">
                Sign in
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
export default SignUpPage;

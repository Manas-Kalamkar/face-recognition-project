import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../ui/Button";
import { login } from "../../services/user-service";

const Login = () => {
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await login(loginForm);

      console.log("Login success:", data);

      // Token already stored in service, but safe
      localStorage.setItem("token", data.jwt);
      localStorage.setItem("data", JSON.stringify(data));

      // Redirect based on role
      if (data.userResponse.role === "EVENT_OWNER") {
        navigate("/photographer/dashboard");
      } else {
        navigate("/guest");
      }

    } catch (err) {
      console.error("Login failed:", err);
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] py-12 px-4">
      <div className="max-w-md w-full">

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">
            Sign in to manage your events
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">

          {/* Email */}
          <div className="relative">
            <input
              type="email"
              value={loginForm.email}
              onChange={(e) =>
                setLoginForm({ ...loginForm, email: e.target.value })
              }
              className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent peer"
              placeholder="Email "
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type="password"
              value={loginForm.password}
              onChange={(e) =>
                setLoginForm({ ...loginForm, password: e.target.value })
              }
              className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent peer"
              placeholder="Password "
              required
            />
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <span className="ml-2 text-sm text-gray-600">
                Remember me
              </span>
            </label>

            <Link
              to="/forgot-password"
              className="text-sm text-purple-600 hover:text-purple-700"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </Button>

        </form>
      </div>
    </div>
  );
};

export default Login;
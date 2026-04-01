import Button from "../ui/Button";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../../services/user-service";

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "guest",
  });

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await signUp(signupForm);
      console.log("Signup success:", data);

      // Navigate based on role after successful API call
      if (signupForm.role === "guest") navigate("/guest");
      else if (signupForm.role === "photographer") navigate("/photographer");
      else if (signupForm.role === "admin") navigate("/admin");

    } catch (err) {
      console.error("Signup failed:", err);
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Create Account
          </h1>
          <p className="text-gray-600">Join us to start finding your photos</p>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-6">
          <input
            type="text"
            value={signupForm.name}
            onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
            placeholder="Full Name"
            className="w-full px-4 py-4 bg-gray-50 border rounded-2xl"
            required
          />
          <input
            type="email"
            value={signupForm.email}
            onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
            placeholder="Email Address"
            className="w-full px-4 py-4 bg-gray-50 border rounded-2xl"
            required
          />
          <input
            type="tel"
            value={signupForm.phone}
            onChange={(e) => setSignupForm({ ...signupForm, phone: e.target.value })}
            placeholder="Phone Number"
            className="w-full px-4 py-4 bg-gray-50 border rounded-2xl"
            required
          />
          <input
            type="password"
            value={signupForm.password}
            onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
            placeholder="Password"
            className="w-full px-4 py-4 bg-gray-50 border rounded-2xl"
            required
          />

          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Sign up as</p>
            <div className="flex gap-4">
              {["guest", "photographer", "admin"].map((role) => (
                <label key={role} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value={role}
                    checked={signupForm.role === role}
                    onChange={(e) => setSignupForm({ ...signupForm, role: e.target.value })}
                    className="text-purple-600 focus:ring-purple-500"
                  />
                  <span className="capitalize text-sm text-gray-700">{role}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex items-start">
            <input type="checkbox" required />
            <span className="ml-2 text-sm text-gray-600">
              I agree to the{" "}
              <Link to="/terms" className="text-purple-600">Terms</Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-purple-600">Privacy Policy</Link>
            </span>
          </div>

          {/* Single submit button — removed the conflicting onClick */}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Continue as:
          <div className="flex justify-center gap-4 mt-2">
            <Link to="/guest" className="text-purple-600 hover:underline">Guest</Link>
            <Link to="/photographer" className="text-purple-600 hover:underline">Photographer</Link>
            <Link to="/admin" className="text-purple-600 hover:underline">Admin</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
import Button from "../ui/Button";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../services/user-service";

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await signUp(signupForm);
      console.log("Signup success:", data);

      // Redirect to login after signup
      navigate("/login");

    } catch (err) {
      console.error("Signup failed:", err);
      setError(err.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Photographer Signup
          </h1>
          <p className="text-gray-600">
            Create your account to manage event albums
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-6">
          <input
            type="text"
            value={signupForm.name}
            onChange={(e) =>
              setSignupForm({ ...signupForm, name: e.target.value })
            }
            placeholder="Full Name"
            className="w-full px-4 py-4 bg-gray-50 border rounded-2xl"
            required
          />

          <input
            type="email"
            value={signupForm.email}
            onChange={(e) =>
              setSignupForm({ ...signupForm, email: e.target.value })
            }
            placeholder="Email Address"
            className="w-full px-4 py-4 bg-gray-50 border rounded-2xl"
            required
          />

          <input
            type="password"
            value={signupForm.password}
            onChange={(e) =>
              setSignupForm({ ...signupForm, password: e.target.value })
            }
            placeholder="Password"
            className="w-full px-4 py-4 bg-gray-50 border rounded-2xl"
            required
          />

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
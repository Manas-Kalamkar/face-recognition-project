import { Link } from "react-router-dom";
import { useState } from "react";

import Button from "../ui/Button"

const Login = () => {

  const [activeTab, setActiveTab] = useState('login');
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });

  const handleLogin = (e) => {
  e.preventDefault();
  console.log('Login:', loginForm);
};


    return (
        <>
 <div className="flex items-center justify-center min-h-[calc(100vh-80px)] py-12 px-4">
        <div className="max-w-md w-full">
              <div>
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h1>
                  <p className="text-gray-600">Sign in to find your photos</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="relative">
                    <input
                      type="email"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                      className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent peer"
                      placeholder=" "
                      required
                    />
                    <label className="absolute left-4 top-4 text-gray-500 transition-all peer-focus:-translate-y-2 peer-focus:scale-90 peer-focus:text-purple-500 peer-valid:-translate-y-2 peer-valid:scale-90">
                      Email Address
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      type="password"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                      className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent peer"
                      placeholder=" "
                      required
                    />
                    <label className="absolute left-4 top-4 text-gray-500 transition-all peer-focus:-translate-y-2 peer-focus:scale-90 peer-focus:text-purple-500 peer-valid:-translate-y-2 peer-valid:scale-90">
                      Password
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                      <span className="ml-2 text-sm text-gray-600">Remember me</span>
                    </label>
                    <Link href="/forgot-password" className="text-sm text-purple-600 hover:text-purple-700">
                      Forgot password?
                    </Link>
                  </div>

                  <Button type="submit" className="w-full">
                    <i className="ri-login-circle-line text-xl"></i>
                    Sign In
                  </Button>
                </form>
              </div>
            </div>
        </div>
        </>
    );
}

export default Login;
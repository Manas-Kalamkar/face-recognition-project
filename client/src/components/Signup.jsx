import Button from "./ui/Button";
import React from "react";
import { Link } from "react-router-dom";

import { useState } from 'react';

const Signup = () => {

  const [activeTab, setActiveTab] = useState('login');
  const [signupForm, setSignupForm] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    phone: '' 
  });


const handleSignup = (e) => {
  e.preventDefault();
  console.log('Signup:', signupForm);
}

    return (
        <>
 <div className="flex items-center justify-center min-h-[calc(100vh-80px)] py-12 px-4">
        <div className="max-w-md w-full">
              <div>
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Account</h1>
                  <p className="text-gray-600">Join us to start finding your photos</p>
                </div>

                <form onSubmit={handleSignup} className="space-y-6">
                  <div className="relative">
                    <input
                      type="text"
                      value={signupForm.name}
                      onChange={(e) => setSignupForm({...signupForm, name: e.target.value})}
                      className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent peer"
                      placeholder=" "
                      required
                    />
                    <label className="absolute left-4 top-4 text-gray-500 transition-all peer-focus:-translate-y-2 peer-focus:scale-90 peer-focus:text-purple-500 peer-valid:-translate-y-2 peer-valid:scale-90">
                      Full Name
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      type="email"
                      value={signupForm.email}
                      onChange={(e) => setSignupForm({...signupForm, email: e.target.value})}
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
                      type="tel"
                      value={signupForm.phone}
                      onChange={(e) => setSignupForm({...signupForm, phone: e.target.value})}
                      className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent peer"
                      placeholder=" "
                      required
                    />
                    <label className="absolute left-4 top-4 text-gray-500 transition-all peer-focus:-translate-y-2 peer-focus:scale-90 peer-focus:text-purple-500 peer-valid:-translate-y-2 peer-valid:scale-90">
                      Phone Number
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      type="password"
                      value={signupForm.password}
                      onChange={(e) => setSignupForm({...signupForm, password: e.target.value})}
                      className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent peer"
                      placeholder=" "
                      required
                    />
                    <label className="absolute left-4 top-4 text-gray-500 transition-all peer-focus:-translate-y-2 peer-focus:scale-90 peer-focus:text-purple-500 peer-valid:-translate-y-2 peer-valid:scale-90">
                      Password
                    </label>
                  </div>

                  <div className="flex items-start">
                    <input type="checkbox" className="mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500" required />
                    <span className="ml-2 text-sm text-gray-600">
                      I agree to the <Link href="/terms" className="text-purple-600 hover:text-purple-700">Terms of Service</Link> and <Link href="/privacy" className="text-purple-600 hover:text-purple-700">Privacy Policy</Link>
                    </span>
                  </div>

                  <Button type="submit" className="w-full">
                    <i className="ri-user-add-line text-xl"></i>
                    Create Account
                  </Button>
                </form>
              </div>
              </div>
              </div>
        </>
    );
}

export default Signup;
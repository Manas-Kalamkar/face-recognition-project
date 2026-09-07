"use client";
import { NavLink } from "react-router-dom";

import React from "react";

const token = localStorage.getItem("token");
const menuConfig = {
  guest: [{ path: "/guest", about: "/about", contact: "/contact" }],

  photographer: [
    { path: "/photographer", about: "/about", contact: "/contact" },
  ],

  admin: [{ path: "/admin", about: "/about", contact: "/contact" }],
};

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "./ui/Button";

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload(); // refresh UI
  };

  return (
    <header className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between">
        {/* Logo */}
        <div
          onClick={() => {
            if (isLoggedIn) {
              navigate("/photographer/dashboard");
            } else {
              navigate("/");
            }
          }}
          className="cursor-pointer font-bold text-xl flex justify-around align-items"
        > 
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">
              EventVision
            </h1>
          </div>
        </div>

        {/* Nav */}
        <div className="flex gap-6 items-center">
          <NavLink to={isLoggedIn ? "/photographer/dashboard" : "/"}>
            Home
          </NavLink>

          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>

          {isLoggedIn ? (
            <Button onClick={handleLogout}>Logout</Button>
          ) : (
            <>
              <NavLink to="/login">
                <Button variant="outline">Login</Button>
              </NavLink>
              <NavLink to="/signup">
                <Button>Get Started</Button>
              </NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

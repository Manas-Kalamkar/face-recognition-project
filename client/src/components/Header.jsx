'use client';
import { NavLink } from 'react-router-dom';

import React from 'react';
import Button from './ui/Button';


const menuConfig = {
  guest: [
    {  path: "/guest", about: "/about", contact: "/contact" }
  ],

  photographer: [
    {  path: "/photographer", about: "/about", contact: "/contact" }
  ],

  admin: [
    {  path: "/admin", about: "/about", contact: "/contact" }
  ],
};


const Header = ({ role }) => {

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <NavLink to={role} className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl flex items-center justify-center">
              <i className="ri-camera-3-line text-white text-xl"></i>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">
              SnapFinder
            </h1>
          </NavLink>

          <nav className="hidden md:flex items-center gap-8">
            {menuConfig[role] ? menuConfig[role]?.map((item) => {
              return (
                <NavLink to={item.path} className="text-gray-600 hover:text-purple-600 transition-colors">
                  Home
                </NavLink>
              )
            }) :
              <NavLink to="/" className="text-gray-600 hover:text-purple-600 transition-colors">
                Home
              </NavLink>}
            {menuConfig[role] ? menuConfig[role]?.map((item) => {
              return (
                <NavLink to={item.about} className="text-gray-600 hover:text-purple-600 transition-colors">
                  About
                </NavLink>
              )
            }) :
              <NavLink to="/about" className="text-gray-600 hover:text-purple-600 transition-colors">
                About
              </NavLink>}
            {menuConfig[role] ? menuConfig[role]?.map((item) => {
              return (
                <NavLink to={item.contact} className="text-gray-600 hover:text-purple-600 transition-colors">
                  Contact
                </NavLink>
              )
            }) :
              <NavLink to="/contact" className="text-gray-600 hover:text-purple-600 transition-colors">
                Contact
              </NavLink>}
          </nav>

          <div className="flex items-center gap-4">
            <NavLink to="/login">
              <Button variant="outline" size="sm">
                Login
              </Button>
            </NavLink>
            <NavLink to="/signup">
              <Button size="sm">
                Get Started
              </Button>
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
}


export default Header;
import { useState } from 'react'
import { createBrowserRouter, Router, RouterProvider } from 'react-router-dom';

import Header from './components/Header';
import Home from './components/Home'; 
import About from './components/About';
import Contact from './components/Contact';
import Signup from './components/Signup';
import Login from './components/Login';
import FindingPhotos from './components/FindingPhotos';

import './App.css'
import 'react-phone-input-2/lib/style.css';
import GuestAuth from './components/GuestAuth';

const App = () => {
  const router = createBrowserRouter([
    {path:"/",element:<><Header /><Home /></>},
    {path:"/about",element:<><Header /><About /></>},
    {path:"/contact",element:<><Header /><Contact /></>},
    {path:"/signup",element:<><Header /><Signup /></>},
    {path:"/login",element:<><Header /><Login /></>},
    {path:"/findingPhotos",element:<><Header /><FindingPhotos /></>},
    {path:"/guestauth",element:<><Header /><GuestAuth /></>},
  ])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <RouterProvider router={router} />
    </div>
  )
}

export default App

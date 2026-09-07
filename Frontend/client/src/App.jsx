import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";

import Header from "./components/Header";
import LeftSidebar from "./components/LeftSidebar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import FindingPhotos from "./components/FindingPhotos";
import GuestAuth from "./components/auth/GuestAuth";
import GuestPage from "./components/guest/GuestPage";
import PhotographerPage from './components/photographr/PhotographerPage';
import ExistingAlbums from "./components/photographr/ExistingAlbum";
import CreateAlbum from "./components/photographr/CreatingAlbums";
import DownloadedPhotos from "./components/guest/DownloadedPhotos";
import SelfieCapture from "./components/guest/SelfieCapture";
import AdminPage from "./components/admin/AdminPage";
import PhotographerManagement from './components/admin/PhotograherManagement'
import GuestManagement from "./components/admin/GuestManagement";
import AlbumModeration from "./components/admin/AlbumModeration";
import Analytics from "./components/admin/Analytics";
import PlatformSettings from "./components/admin/PlatformSettings";
import Reports from "./components/admin/Reports";
import AlbumPage from "./pages/AlbumPage";


const PublicLayout = () => {
  return (
    <>
      <Header />
      <Outlet /> 
    </>
  );
};

const DashboardLayout = ({ role }) => {
  return (
    <>
      <Header role={role} />
      <div className="flex min-h-screen">
        <LeftSidebar role={role} />

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>

    </>
  );
};




const router = createBrowserRouter([
  // 🌐 Public pages
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/signup", element: <Signup /> },
      { path: "/login", element: <Login /> },
      { path: "/guestauth", element: <GuestAuth /> },


    ],
  },

  // 👤 Guest dashboard
  {
    element: <DashboardLayout role="guest" />,
    children: [
      { path: "/guest", element: <GuestPage /> },
      { path: "/findingPhotos", element: <FindingPhotos /> },
      { path: "/guest/downloads", element: <DownloadedPhotos /> },
      { path: "/guest/register/:event", element: <SelfieCapture /> },
    ],
  },

  // 📸 Photographer dashboard
  {
    element: <DashboardLayout role="photographer" />,
    children: [
      { path: "/photographer/dashboard", element: <PhotographerPage /> },

      { path: "/photographer/albums", element: <ExistingAlbums /> },
      { path: "/photographer/albums/:eventId", element: <AlbumPage /> },
      { path: "/photographer/create", element: <CreateAlbum /> },
    ],
  },

  // 🛡 Admin dashboard
  {
    element: <DashboardLayout role="admin" />,
    children: [
      { path: "/admin", element: <AdminPage /> },
      { path: "/admin/photographers", element: <PhotographerManagement /> },
      { path: "/admin/guests", element: <GuestManagement /> },
      { path: "/admin/albums", element: <AlbumModeration /> },
      { path: "/admin/analytics", element: <Analytics /> },
      { path: "/admin/settings", element: <PlatformSettings /> },
      { path: "/admin/reports", element: <Reports /> }
    ],
  },
]);


const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;

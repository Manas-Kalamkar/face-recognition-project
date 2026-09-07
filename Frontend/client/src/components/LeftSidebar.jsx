import { NavLink } from "react-router-dom";

const token = localStorage.getItem("token");

const menuConfig = {
  guest: [
    {
      label: "Find Photos",
      path: "/findingPhotos",
      icon: "ri-image-search-line",
    },
    // { label: "My Access", path: "/guest", icon: "ri-user-line" },
  ],

  photographer: [
    {
      label: "Dashboard",
      path: "/photographer/dashboard",
      icon: "ri-dashboard-line",
    },
    {
      label: "Create Event",
      path: "/photographer/create",
      icon: "ri-add-box-line",
    },
    { label: "My Events", path: "/photographer/albums", icon: "ri-image-line" },
  ],

  admin: [
    { label: "Admin Dashboard", path: "/admin", icon: "ri-shield-user-line" },
    {
      label: "Photographers",
      path: "/admin/photographers",
      icon: "ri-camera-line",
    },
    { label: "Users", path: "/admin/users", icon: "ri-user-3-line" },
    { label: "Settings", path: "/admin/settings", icon: "ri-settings-3-line" },
  ],
};

const LeftSidebar = ({ role = "guest" }) => {
  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 p-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-6 capitalize">
        Panel
      </h2>

      <nav className="space-y-2">
        {menuConfig[role]?.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition
              ${
                isActive
                  ? "bg-purple-100 text-purple-700 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            <i className={`${item.icon} text-lg`} />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default LeftSidebar;

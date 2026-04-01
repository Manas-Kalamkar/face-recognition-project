import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const navigate = useNavigate();

  const cards = [
    { title: "Photographers", icon: "ri-camera-line", path: "/admin/photographers" },
    { title: "Guests", icon: "ri-user-line", path: "/admin/guests" },
    { title: "Albums", icon: "ri-folder-image-line", path: "/admin/albums" },
    { title: "Analytics", icon: "ri-bar-chart-line", path: "/admin/analytics" },
    { title: "Settings", icon: "ri-settings-3-line", path: "/admin/settings" },
    { title: "Reports", icon: "ri-alert-line", path: "/admin/reports" },
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div
            key={card.title}
            onClick={() => navigate(card.path)}
            className="cursor-pointer bg-white border rounded-2xl p-6 hover:shadow-md transition"
          >
            <i className={`${card.icon} text-4xl text-purple-600 mb-4`} />
            <h2 className="font-semibold">{card.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;

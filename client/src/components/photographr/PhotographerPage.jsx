import { useNavigate } from "react-router-dom";

const PhotographerPage = () => {
  const navigate = useNavigate();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-2">Photographer Dashboard</h1>
      <p className="text-gray-600 mb-8">
        Upload albums, manage events, view guests
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Existing Albums */}
        <div
          onClick={() => navigate("/photographer/albums")}
          className="cursor-pointer border rounded-2xl p-6 bg-white hover:shadow-md transition"
        >
          <div className="flex items-center gap-4">
            <i className="ri-folder-image-line text-4xl text-purple-600"></i>
            <div>
              <h2 className="text-lg font-semibold">Existing Albums</h2>
              <p className="text-sm text-gray-500">
                View and manage uploaded albums
              </p>
            </div>
          </div>
        </div>

        {/* Add New Album */}
        <div
          onClick={() => navigate("/photographer/create")}
          className="cursor-pointer border rounded-2xl p-6 bg-white hover:shadow-md transition"
        >
          <div className="flex items-center gap-4">
            <i className="ri-folder-add-line text-4xl text-green-600"></i>
            <div>
              <h2 className="text-lg font-semibold">Add New Album</h2>
              <p className="text-sm text-gray-500">
                Create a new event album
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotographerPage;

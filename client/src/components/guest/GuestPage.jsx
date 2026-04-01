import { useNavigate } from "react-router-dom";

const GuestPage = () => {
  const navigate = useNavigate();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-2">Guest Dashboard</h1>
      <p className="text-gray-600 mb-8">
        Access event photos using face scan or link
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Downloaded Photos */}
        <div
          onClick={() => navigate("/guest/downloads")}
          className="cursor-pointer border rounded-2xl p-6 bg-white hover:shadow-md transition"
        >
          <div className="flex items-center gap-4">
            <i className="ri-folder-download-line text-4xl text-purple-600"></i>
            <div>
              <h2 className="text-lg font-semibold">Downloaded Photos</h2>
              <p className="text-sm text-gray-500">
                View photos you’ve already downloaded
              </p>
            </div>
          </div>
        </div>

        {/* Live Face Scan */}
        <div
          onClick={() => navigate("/guest/scan")}
          className="cursor-pointer border rounded-2xl p-6 bg-white hover:shadow-md transition"
        >
          <div className="flex items-center gap-4">
            <i className="ri-camera-line text-4xl text-green-600"></i>
            <div>
              <h2 className="text-lg font-semibold">Live Face Scan</h2>
              <p className="text-sm text-gray-500">
                Scan your face to find your photos
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestPage;

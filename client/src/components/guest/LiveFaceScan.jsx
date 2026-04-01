const LiveFaceScan = () => {
  return (
    <div className="p-8 text-center max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Live Face Scan</h1>
      <p className="text-gray-600 mb-6">
        Allow camera access to scan your face and find matching photos
      </p>

      <div className="border-2 border-dashed border-gray-300 rounded-2xl p-10 mb-6">
        <i className="ri-camera-3-line text-6xl text-gray-400"></i>
        <p className="text-gray-500 mt-4">
          Camera preview will appear here
        </p>
      </div>

      <button className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition">
        Start Face Scan
      </button>
    </div>
  );
};

export default LiveFaceScan;

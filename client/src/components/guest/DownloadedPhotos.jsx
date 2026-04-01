const DownloadedPhotos = () => {
  // Placeholder data
  const photos = [
    { id: 1, name: "photo_01.jpg" },
    { id: 2, name: "photo_02.jpg" },
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-2">Downloaded Photos</h1>
      <p className="text-gray-600 mb-6">
        Photos you have saved from events
      </p>

      {photos.length === 0 ? (
        <p className="text-gray-500">No downloaded photos yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="border rounded-xl p-3 bg-white text-center"
            >
              <i className="ri-image-line text-3xl text-purple-600 mb-2"></i>
              <p className="text-sm truncate">{photo.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DownloadedPhotos;

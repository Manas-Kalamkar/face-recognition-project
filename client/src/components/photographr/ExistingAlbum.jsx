const ExistingAlbums = () => {
  // Later this will come from backend / API
  const albums = [
    {
      id: 1,
      title: "Wedding – Rahul & Priya",
      date: "12 Jan 2026",
    },
    {
      id: 2,
      title: "Birthday Party – Aarav",
      date: "05 Feb 2026",
    },
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-2">Existing Albums</h1>
      <p className="text-gray-600 mb-6">
        Manage your uploaded event albums
      </p>

      {albums.length === 0 ? (
        <p className="text-gray-500">No albums created yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {albums.map((album) => (
            <div
              key={album.id}
              className="border rounded-2xl p-5 bg-white hover:shadow-md transition cursor-pointer"
            >
              <i className="ri-folder-image-line text-3xl text-purple-600 mb-3"></i>
              <h2 className="font-semibold">{album.title}</h2>
              <p className="text-sm text-gray-500">{album.date}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExistingAlbums;

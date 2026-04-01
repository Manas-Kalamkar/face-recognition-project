const AlbumModeration = () => {
  const albums = [
    { id: 1, name: "Wedding Album", status: "Active" },
    { id: 2, name: "Birthday Album", status: "Reported" },
  ];

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">Album Moderation</h1>

      {albums.map((album) => (
        <div
          key={album.id}
          className="bg-white border rounded-xl p-4 mb-3 flex justify-between"
        >
          <span>{album.name}</span>
          <span className="text-sm text-red-500">{album.status}</span>
        </div>
      ))}
    </div>
  );
};

export default AlbumModeration;

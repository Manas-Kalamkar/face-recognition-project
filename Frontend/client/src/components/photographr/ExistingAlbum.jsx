import { useEffect, useState, useCallback } from "react";
import { getMyAlbums, deleteAlbum } from "../../services/event-service";

const ExistingAlbum = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedID,setCopiedID] = useState(null);
  const [linkCopy,setLinkCopy] = useState(false);

  // 🔥 Fetch Albums (optimized)
  const fetchAlbums = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getMyAlbums();
      console.log(data)
      setAlbums(data);
    } catch (err) {
      console.error("Error fetching albums:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ Initial load + auto refresh on tab focus
  useEffect(() => {
    fetchAlbums();

    window.addEventListener("focus", fetchAlbums);
    return () => window.removeEventListener("focus", fetchAlbums);
  }, [fetchAlbums]);

  // ✅ Delete handler (instant UI update)
  const handleDelete = async (id) => {
    try {
      await deleteAlbum(id);
      setAlbums((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // ✅ Copy link
  const handleCopy = (id) => {
    navigator.clipboard.writeText(`${id}`);
    setLinkCopy(true);
    setCopiedID(id);

    setTimeout(()=>{
      setLinkCopy(false);
    },1800)
    
  };

  if (loading) return <p className="p-8">Loading albums...</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">My Albums</h1>

      {albums.length === 0 ? (
        <p>No albums yet</p>
      ) : (
        <div className="grid gap-4">
          {albums.map((album) => (
            <div
              key={album.id}
              className="border p-4 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <h2 className="font-semibold text-lg">{album.name}</h2>
              <p className="text-sm text-gray-500">{album.ownerName}</p>
              <p className="text-sm text-gray-500">{album.id}</p>

              <p className="text-sm mt-1">
                Password:{" "}
                <span className="font-mono">{album.password}</span>
              </p>

              <div className="mt-3 flex flex-wrap gap-3">
                
                {/* ✅ Open Drive */}
                <button
                  onClick={() => window.open(album.drive?.driveLink, "_blank")}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Open Album
                </button>

                {/* ✅ Copy Link */}
                <button
                  onClick={() => {
                    handleCopy(album.id);
                  }}
                  className={`border px-3 py-1 rounded ${album.id == copiedID && linkCopy?"bg-green-500" : ""}`}
                >
                  {album.id == copiedID && linkCopy?'Copied':'Copy Link'}
                </button>

                {/* ✅ Delete */}
                <button
                  onClick={() => handleDelete(album.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExistingAlbum;
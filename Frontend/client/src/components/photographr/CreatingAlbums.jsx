import { useRef, useState, useEffect } from "react";
import {
  createEvent,
  processAlbum,
  getAlbumStatus,
  deleteAlbum,
} from "../../services/event-service";
import { useNavigate } from "react-router-dom";

const CreateAlbum = () => {
  const navigate = useNavigate();

  const storedData = JSON.parse(localStorage.getItem("data"));
  const user = storedData?.userResponse;

  const [formData, setFormData] = useState({
    userId: user?.id || "",
    eventName: "",
    password: "",
    ownerName: "",
    driveLink: "",
  });

  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState({
    processed: 0,
    total: 0,
    status: "",
  });

  // ✅ useRef at top level, outside any block
  const intervalRef = useRef(null);

  // ✅ useEffect at top level, outside any block
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("User not logged in ");
      return;
    }

    setProcessing(true);

    try {
      // Step 1: Create Event
      const created = await createEvent({
        name: formData.eventName,
        password: formData.password,
        driveLink: formData.driveLink,
        userId: user.id,
        ownerName: formData.ownerName,
      });

      const eventId = created.id;
      console.log("Event created:", eventId);

      // Step 2: Start processing
      await processAlbum(eventId);
      console.log("Processing started");

      // Step 3: Poll status
      intervalRef.current = setInterval(async () => {
        try {
          const status = await getAlbumStatus(eventId);
          setProgress(status);
          console.log("Status:", status);

          if (status.status === "COMPLETED") {
            clearInterval(intervalRef.current); // ✅ correct ref
            navigate("/photographer/albums");
          }

          if (status.status === "FAILED") {
            clearInterval(intervalRef.current); // ✅ correct ref
            try {
              await deleteAlbum(created.id); // Ensure this finishes before moving on
              console.log("Cleanup: Failed album deleted");
            } catch (deleteErr) {
              console.error("Cleanup failed:", deleteErr);
            }
            setProcessing(false);
            alert("Processing failed ");
          }
        } catch (err) {
          console.error("Polling error:", err);
          clearInterval(intervalRef.current); // ✅ correct ref
          setProcessing(false);
        }
      }, 5000);
    } catch (err) {
      console.error("Error creating album:", err);
      setProcessing(false);
      alert("Failed to create album ");
    }
  };

  // ✅ Processing UI — if block AFTER all hooks
  if (processing) {
    return (
      <div className="p-8 max-w-xl">
        <h2 className="text-xl font-bold mb-2">Processing Album...</h2>
        <p className="text-gray-500 mb-6">
          Running face recognition on your photos...
        </p>

        <div className="w-full bg-gray-100 rounded-full h-3 mb-2">
          <div
            className="bg-purple-600 h-3 rounded-full transition-all duration-500"
            style={{
              width:
                progress.total > 0
                  ? `${Math.round((progress.processed / progress.total) * 100)}%`
                  : "5%",
            }}
          />
        </div>

        <p className="text-sm text-gray-500">
          {progress.total > 0
            ? `${progress.processed} / ${progress.total} photos processed`
            : "Starting..."}
        </p>

        <p className="text-xs text-gray-400 mt-1">
          Status: {progress.status || "PENDING"}
        </p>
      </div>
    );
  }

  // ✅ Form UI
  return (
    <div className="p-8 max-w-xl">
      <h1 className="text-2xl font-bold mb-2">Create New Album</h1>
      <p className="text-gray-600 mb-6">Set up a new event photo album</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          placeholder="Event Name"
          value={formData.eventName}
          onChange={(e) =>
            setFormData({ ...formData, eventName: e.target.value })
          }
          className="w-full px-4 py-3 border rounded-xl"
          required
        />

        <input
          type="text"
          placeholder="Owner Name"
          value={formData.ownerName}
          onChange={(e) =>
            setFormData({ ...formData, ownerName: e.target.value })
          }
          className="w-full px-4 py-3 border rounded-xl"
          required
        />

        <input
          type="password"
          placeholder="Album Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          className="w-full px-4 py-3 border rounded-xl"
          required
        />

        <input
          type="text"
          placeholder="Google Drive Folder Link"
          value={formData.driveLink}
          onChange={(e) =>
            setFormData({ ...formData, driveLink: e.target.value })
          }
          className="w-full px-4 py-3 border rounded-xl"
          required
        />

        <button
          type="submit"
          className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition"
        >
          Create Album
        </button>
      </form>
    </div>
  );
};

export default CreateAlbum;

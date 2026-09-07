import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { getAuthHeader } from "../services/user-service";

function AlbumPage() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetchEvent();
  }, []);

const fetchEvent = async () => {
  try {
    const res = await axios.get(
      `http://localhost:8081/api/event/${eventId}`,
      {
        headers: getAuthHeader(),
      }
    );

    setEvent(res.data); // 🔥 FIXED (see next problem)
  } catch (err) {
    console.error(err);
  }
};

  if (!event) return <div>Loading...</div>;

  return (
    <div>
      <h1>{event.name}</h1>

      <h2>Photos</h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
        {event.photos.map((photo) => (
          <img
            key={photo.id}
            src={`https://drive.google.com/uc?export=view&id=${photo.driveFileId}`}
            alt=""
            style={{ width: "100%" }}
          />
        ))}
      </div>
    </div>
  );
}

export default AlbumPage;
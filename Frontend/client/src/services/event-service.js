const BASE_URL = 'http://localhost:8081/api/event';

const authHeaders = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error("User not authenticated");
  }

  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};


export const createEvent = async (payload) => {
  const res = await fetch(`${BASE_URL}/create`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Create failed");
  }
  return res.json();
};

export const deleteAlbum = async (id) => {
  const res = await fetch(`${BASE_URL}/delete/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Delete failed");
  return res.json();
};

export const processAlbum = async (eventId) => {
  const res = await fetch(`${BASE_URL}/process-album/${eventId}`, {
    method: 'POST',
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Processing failed");
  return res.text();
};

export const getAlbumStatus = async (eventId) => {
  const res = await fetch(`${BASE_URL}/album-status/${eventId}`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Status failed");
  return res.json();
};


// GET
export const getMyAlbums = async () => {
  const res = await fetch(`${BASE_URL}/my-events`, {
    headers: authHeaders(),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Backend error:", text);
    throw new Error("Failed to fetch albums");
  }

  return res.json();
};
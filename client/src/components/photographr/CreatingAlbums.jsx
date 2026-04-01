import { useState } from "react";

const CreateAlbum = () => {
  const [formData, setFormData] = useState({
    eventName: "",
    eventDate: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Album:", formData);
  };

  return (
    <div className="p-8 max-w-xl">
      <h1 className="text-2xl font-bold mb-2">Create New Album</h1>
      <p className="text-gray-600 mb-6">
        Set up a new event photo album
      </p>

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
          type="date"
          value={formData.eventDate}
          onChange={(e) =>
            setFormData({ ...formData, eventDate: e.target.value })
          }
          className="w-full px-4 py-3 border rounded-xl"
          required
        />

        <input
          type="password"
          placeholder="Album Password (optional)"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          className="w-full px-4 py-3 border rounded-xl"
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

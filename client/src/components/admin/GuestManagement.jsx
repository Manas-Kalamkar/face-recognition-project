const GuestManagement = () => {
  const guests = [
    { id: 1, name: "Guest 1", downloads: 5 },
    { id: 2, name: "Guest 2", downloads: 2 },
  ];

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">Guests</h1>

      <ul className="space-y-3">
        {guests.map((g) => (
          <li key={g.id} className="bg-white border rounded-xl p-4">
            {g.name} — Downloads: {g.downloads}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GuestManagement;

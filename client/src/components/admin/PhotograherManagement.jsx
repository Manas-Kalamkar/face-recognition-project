const PhotographerManagement = () => {
  const photographers = [
    { id: 1, name: "John Studio", status: "Active" },
    { id: 2, name: "LensCraft", status: "Blocked" },
  ];

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">Photographers</h1>

      <table className="w-full bg-white border rounded-xl">
        <thead>
          <tr className="border-b">
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {photographers.map((p) => (
            <tr key={p.id} className="border-b">
              <td className="p-3">{p.name}</td>
              <td className="p-3">{p.status}</td>
              <td className="p-3 text-purple-600 cursor-pointer">Toggle</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PhotographerManagement;

const Analytics = () => {
  const stats = [
    { label: "Total Photographers", value: 24 },
    { label: "Total Albums", value: 312 },
    { label: "Face Scans", value: 1280 },
  ];

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-6">Platform Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((s) => (
          <div key={s.label} className="bg-white border rounded-xl p-6">
            <p className="text-gray-500">{s.label}</p>
            <h2 className="text-2xl font-bold">{s.value}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Analytics;

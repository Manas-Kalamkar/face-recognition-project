const Reports = () => {
  const reports = [
    { id: 1, reason: "Inappropriate content" },
    { id: 2, reason: "Spam album" },
  ];

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">Reports & Abuse</h1>

      {reports.map((r) => (
        <div key={r.id} className="bg-white border rounded-xl p-4 mb-3">
          {r.reason}
        </div>
      ))}
    </div>
  );
};

export default Reports;

const PlatformSettings = () => {
  return (
    <div className="p-8 max-w-xl">
      <h1 className="text-xl font-bold mb-4">Platform Settings</h1>

      <div className="space-y-4">
        <label className="block">
          Max Albums per Photographer
          <input type="number" className="w-full border rounded-xl p-2 mt-1" />
        </label>

        <label className="block">
          Enable Guest Downloads
          <input type="checkbox" className="ml-2" />
        </label>
      </div>
    </div>
  );
};

export default PlatformSettings;

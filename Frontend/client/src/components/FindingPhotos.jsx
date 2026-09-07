import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const BASE_URL = 'http://localhost:8081';

const GuestEventSearch = () => {
  const navigate = useNavigate();
  const { eventId: urlEventId } = useParams(); // supports /event/:eventId route

  const [searchId, setSearchId] = useState(urlEventId || '');
  const [event, setEvent] = useState(null);
  const [searchError, setSearchError] = useState('');
  const [searching, setSearching] = useState(false);

  // Password modal state
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // ── Search event by ID ──────────────────────────────────────────
  const handleSearch = async (idToSearch) => {
    const id = (idToSearch ?? searchId).trim();
    if (!id) return;

    setSearchError('');
    setEvent(null);
    setSearching(true);

    try {
      const res = await fetch(`${BASE_URL}/api/event/getEvent/${id}`);
      if (!res.ok) throw new Error('Not found');
      const data = await res.json();
      setEvent(data);
    } catch {
      setSearchError('No event found for this ID. Please check and try again.');
    } finally {
      setSearching(false);
    }
  };

  // ── Handle URL paste (extract event ID from URL if pasted) ──────
  const handleInputChange = (val) => {
    setSearchId(val);
    setSearchError('');

    // If user pastes a event ID like 4a1de9ff-...
    const match = val.match(/\/event\/([a-f0-9-]{36})/);
    if (match) {
      setSearchId(match[1]);
      handleSearch(match[1]);
    }
  };

  // ── Password check (client side — backend fix needed to not expose password) ──
  const handlePasswordSubmit = () => {
    setPasswordError('');
    if (password === event.password) {
      // Save event info for guest registration page
      localStorage.setItem('guestEventId', event.id);
      localStorage.setItem('guestEventName', event.name);
      localStorage.setItem('guestOwnerName', event.ownerName);
      navigate(`/guest/register/${event.id}`);
    } else {
      setPasswordError('Incorrect password. Please try again.');
    }
  };

  // ── Status badge ─────────────────────────────────────────────────
  const statusBadge = (status) => {
    const map = {
      COMPLETED: 'bg-green-100 text-green-700',
      PROCESSING: 'bg-yellow-100 text-yellow-700',
      FAILED: 'bg-red-100 text-red-700',
    };
    return map[status] || 'bg-gray-100 text-gray-500';
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] py-12 px-4">
      <div className="max-w-lg w-full space-y-6">

        {/* ── Header ── */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-purple-700">Find Your Event</h1>
          <p className="text-gray-500 mt-1 text-sm">
            Enter the event ID or paste the event link
          </p>
        </div>

        {/* ── Search bar ── */}
        <div className="flex gap-2">
          <input
            type="text"
            value={searchId}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Enter event ID"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
          />
          <button
            onClick={() => handleSearch()}
            disabled={searching || !searchId.trim()}
            className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white px-5 py-3 rounded-xl font-semibold transition"
          >
            {searching ? '...' : 'Search'}
          </button>
        </div>

        {/* ── Error ── */}
        {searchError && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
            {searchError}
          </div>
        )}

        {/* ── Event Card ── */}
        {event && (
          <div
            onClick={() => { setShowModal(true); setPassword(''); setPasswordError(''); }}
            className="border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md cursor-pointer transition bg-white"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-800">{event.name}</h2>
                <p className="text-sm text-gray-500 mt-0.5">by {event.ownerName}</p>
              </div>
              <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusBadge(event.processingStatus)}`}>
                {event.processingStatus ?? 'PENDING'}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-gray-400 text-xs">Total Photos</p>
                <p className="font-semibold text-gray-700 text-lg">{event.totalPhotos}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-gray-400 text-xs">Processed</p>
                <p className="font-semibold text-gray-700 text-lg">{event.processedPhotos}</p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <p className="text-xs text-gray-400 truncate max-w-[70%]">ID: {event.id}</p>
              <button className="text-purple-600 text-sm font-semibold hover:underline">
                Access →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Password Modal ── */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl space-y-4">
            <h2 className="text-lg font-bold text-gray-800">Enter Album Password</h2>
            <p className="text-sm text-gray-500">
              This album is password protected. Enter the password to continue.
            </p>

            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setPasswordError(''); }}
              onKeyDown={(e) => e.key === 'Enter' && handlePasswordSubmit()}
              placeholder="Album password"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              autoFocus
            />

            {passwordError && (
              <p className="text-red-600 text-sm">{passwordError}</p>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 border border-gray-300 text-gray-600 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handlePasswordSubmit}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2.5 rounded-xl text-sm font-semibold transition"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuestEventSearch;

import { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const BASE_URL = 'http://localhost:8081';

const GuestSelfie = (props) => {
  // ✅ get event from props OR url params — whichever is available
  const { event: eventFromParams } = useParams();
  const event = props.event || eventFromParams;

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [streaming, setStreaming] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const [cameraError, setCameraError] = useState('');
  const [capturedImage, setCapturedImage] = useState(null); // ✅ preview in same screen
  const [capturedBlob, setCapturedBlob] = useState(null);

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  const startCamera = async () => {
    setCameraError('');
    setCapturedImage(null);
    setCapturedBlob(null);
    setError('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: 'user' }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
          setStreaming(true);
        };
      }
    } catch {
      setCameraError('Could not access camera. Please allow camera permission and try again.');
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(t => t.stop());
      setStreaming(false);
    }
  };

  // ── Capture: stop camera, show preview in same box ───────────
  const capture = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (!video.videoWidth || !video.videoHeight) {
      setError('Camera not ready yet. Please wait a moment and try again.');
      return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    // ✅ un-mirror for ML backend
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0);

    stopCamera();

    canvas.toBlob((blob) => {
      console.log('Blob size:', blob.size, 'type:', blob.type);
      setCapturedBlob(blob);
      // ✅ show captured image in same camera box
      setCapturedImage(URL.createObjectURL(blob));
    }, 'image/jpeg', 0.95);
  };

  // ── Send captured selfie to backend ──────────────────────────
  const searchPhotos = async () => {
  if (!capturedBlob) return;

  setLoading(true);
  setError('');

  try {
    const formData = new FormData();
    formData.append('file', capturedBlob, 'selfie.jpg'); // ✅ FIXED

    const res = await fetch(`${BASE_URL}/events/search-selfie/${event}`, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    console.log('API response:', data);

    setResults(data.matches ?? []);
  } catch (err) {
    console.error('Search error:', err);
    setError('Could not find your photos. Please try again.');
  } finally {
    setLoading(false);
  }
};

  const retake = () => {
    setResults(null);
    setCapturedImage(null);
    setCapturedBlob(null);
    setError('');
    startCamera();
  };

  const confidenceLabel = (score) => {
    if (score >= 0.9) return { text: 'Strong match', color: 'text-green-600' };
    if (score >= 0.6) return { text: 'Good match', color: 'text-yellow-600' };
    return { text: 'Possible match', color: 'text-gray-400' };
  };

  // ── Loading ───────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] gap-4">
        <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-500 text-sm">Finding your photos...</p>
      </div>
    );
  }

  // ── Results ───────────────────────────────────────────────────
  if (results !== null) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-purple-700">Your Photos</h1>
            <p className="text-gray-400 text-sm mt-0.5">{results.length} photo(s) found</p>
          </div>
          <button
            onClick={retake}
            className="text-sm text-purple-600 border border-purple-300 px-4 py-2 rounded-xl hover:bg-purple-50 transition"
          >
            Retake Selfie
          </button>
        </div>

        {results.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-4xl mb-4">😕</p>
            <p className="text-gray-500 text-lg">No matching photos found.</p>
            <p className="text-gray-400 text-sm mt-1">
              Try better lighting with your face clearly visible.
            </p>
            <button
              onClick={retake}
              className="mt-6 bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {results.map((photo) => {
              const conf = confidenceLabel(photo.confidence);
              return (
                <div
                  key={photo.photoId}
                  className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 group relative bg-white"
                >
                  <img
                    src={`${BASE_URL}${photo.imageUrl}`}
                    alt={photo.filename}
                    className="w-full h-44 object-cover group-hover:scale-105 transition duration-300"
                    onError={(e) => { e.target.src = 'https://placehold.co/400x300?text=Photo'; }}
                  />
                  <div className="absolute inset-0 flex items-end p-3 opacity-0 group-hover:opacity-100 transition bg-gradient-to-t from-black/60 to-transparent">
                    <a
                      href={`${BASE_URL}${photo.imageUrl}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-white text-xs font-medium underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View full ↗
                    </a>
                  </div>
                  <div className="p-2 border-t border-gray-100">
                    <p className="text-xs text-gray-500 truncate">{photo.filename}</p>
                    <p className={`text-xs font-medium ${conf.color}`}>{conf.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // ── Camera + Capture preview ──────────────────────────────────
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 py-10">
      <div className="max-w-md w-full space-y-5">

        <div className="text-center">
          <h1 className="text-2xl font-bold text-purple-700">
            {capturedImage ? 'Looks good?' : 'Find Your Photos'}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {capturedImage
              ? 'Make sure your face is clearly visible'
              : "Take a selfie and we'll find all your photos from this event"}
          </p>
        </div>

        {/* ✅ Same box — shows live camera OR captured image */}
        <div className="relative rounded-2xl overflow-hidden bg-gray-900 aspect-video">
          {/* Live camera feed — hidden after capture */}
          <video
            ref={videoRef}
            className={`w-full h-full object-cover ${capturedImage ? 'hidden' : 'block'}`}
            style={{ transform: 'scaleX(-1)' }}
            muted
            playsInline
          />

          {/* Captured image — shown after capture in same box */}
          {capturedImage && (
            <img
              src={capturedImage}
              alt="Captured selfie"
              className="w-full h-full object-cover"
            />
          )}

          {/* Face guide oval — only while streaming */}
          {streaming && !capturedImage && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-36 h-44 border-2 border-white/70 rounded-full" />
            </div>
          )}

          {/* Retake overlay button on captured image */}
          {capturedImage && (
            <button
              onClick={retake}
              className="absolute top-3 right-3 bg-black/50 text-white text-xs px-3 py-1.5 rounded-full hover:bg-black/70 transition"
            >
              Retake
            </button>
          )}
        </div>

        <canvas ref={canvasRef} className="hidden" />

        {cameraError && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
            {cameraError}
            <button onClick={startCamera} className="ml-2 underline font-medium">Retry</button>
          </div>
        )}

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
            {error}
          </div>
        )}

        {/* ✅ Button changes based on state */}
        {!capturedImage ? (
          streaming ? (
            <button
              onClick={capture}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2"
            >
              <span>📸</span> Take Selfie
            </button>
          ) : !cameraError && (
            <button
              onClick={startCamera}
              className="w-full border border-purple-300 text-purple-600 font-semibold py-3 rounded-xl hover:bg-purple-50 transition"
            >
              Open Camera
            </button>
          )
        ) : (
          <div className="flex gap-3">
            <button
              onClick={retake}
              className="flex-1 border border-gray-300 text-gray-600 py-3 rounded-xl text-sm font-medium hover:bg-gray-50 transition"
            >
              Retake
            </button>
            <button
              onClick={searchPhotos}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl text-sm font-semibold transition"
            >
              Find My Photos
            </button>
          </div>
        )}

        <p className="text-center text-xs text-gray-400">
          Your selfie is only used to find your photos and is not stored.
        </p>
      </div>
    </div>
  );
};

export default GuestSelfie;

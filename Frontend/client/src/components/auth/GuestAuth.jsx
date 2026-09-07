import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import api from '../../services/api';

const GuestAuth = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const [capturedBlob, setCapturedBlob] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
      setStreaming(true);
      setCapturedBlob(null);
      setPreviewUrl(null);
    } catch {
      setError('Camera access denied. Please allow camera permission.');
    }
  };

  const takeSelfie = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);

    // Stop camera stream
    video.srcObject.getTracks().forEach(t => t.stop());
    setStreaming(false);

    canvas.toBlob((blob) => {
      setCapturedBlob(blob);
      setPreviewUrl(URL.createObjectURL(blob));
    }, 'image/jpeg');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!capturedBlob) {
      setError('Please capture your selfie first.');
      return;
    }
    if (!consent) {
      setError('Please accept the privacy policy.');
      return;
    }

    const eventId = localStorage.getItem('eventId');
    if (!eventId) {
      setError('No event selected. Please go back and enter the album link.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const form = new FormData();
      form.append('file', new File([capturedBlob], 'selfie.jpg', { type: 'image/jpeg' }));

      const res = await api.post(
        `/events/search-selfie/${eventId}`,
        form,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      // Save results and navigate to photos page
      localStorage.setItem('matchedPhotos', JSON.stringify(res.data));
      navigate('/my-photos');

    } catch (err) {
      setError('Face matching failed. Please try again with a clearer selfie.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] py-12 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-xl space-y-6">
        <h1 className="text-3xl font-bold text-purple-700 text-center">Guest Authentication</h1>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Full Name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)}
              required placeholder="Your full name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              required placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
            <PhoneInput country={'in'} value={phone} onChange={setPhone}
              inputProps={{ required: true, name: 'phone' }}
              inputStyle={{ width: '100%', height: '42px', borderRadius: '8px', border: '1px solid #D1D5DB' }}
              containerStyle={{ width: '100%' }}
              buttonStyle={{ borderTopLeftRadius: '8px', borderBottomLeftRadius: '8px' }} />
          </div>

          {/* Camera section */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Capture Selfie</label>

            {/* Live video preview */}
            <video
              ref={videoRef}
              style={{ display: streaming ? 'block' : 'none' }}
              className="w-full rounded-xl mb-2"
            />
            <canvas ref={canvasRef} style={{ display: 'none' }} />

            {/* Captured selfie preview */}
            {previewUrl && (
              <div className="mb-2">
                <img src={previewUrl} alt="Your selfie"
                  className="w-full rounded-xl border-2 border-purple-300" />
                <p className="text-sm text-green-600 mt-1 text-center">Selfie captured!</p>
              </div>
            )}

            {!streaming && !previewUrl && (
              <button type="button" onClick={startCamera}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition duration-200">
                Open Camera
              </button>
            )}

            {streaming && (
              <button type="button" onClick={takeSelfie}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition duration-200">
                Take Photo
              </button>
            )}

            {previewUrl && !streaming && (
              <button type="button" onClick={startCamera}
                className="w-full mt-2 border border-purple-400 text-purple-600 font-semibold py-2 rounded-lg">
                Retake
              </button>
            )}
          </div>

          <div className="flex items-start gap-2">
            <input type="checkbox" id="consent" checked={consent}
              onChange={e => setConsent(e.target.checked)} className="mt-1" />
            <label htmlFor="consent" className="text-sm text-gray-600">
              I agree to the <a href="#" className="text-purple-600 underline">Privacy Policy</a> and give my consent.
            </label>
          </div>

          <button type="submit" disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-60 text-white font-semibold py-3 rounded-lg text-lg transition duration-200">
            {loading ? 'Finding your photos...' : 'Get My Photos'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default GuestAuth;
import api from './api';

// Returns a blob URL you can use in <img src={...} />
export const getPhotoUrl = (photoId) =>
  `http://localhost:8080/photos/${photoId}`;

// Use this if you need to download the actual bytes
export const fetchPhoto = (photoId) =>
  api.get(`/photos/${photoId}`, { responseType: 'blob' });
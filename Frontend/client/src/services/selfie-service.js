import api from './api';

export const searchBySelfie = (eventId, file) => {
  const form = new FormData();
  form.append('file', file); // must match @RequestParam(name = "file")
  return api.post(`/events/search-selfie/${eventId}`, form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
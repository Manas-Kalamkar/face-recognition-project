import axios from "axios";

const BASE_URL = "http://localhost:8081/api";

// Create Axios instance (clean + reusable)
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ==================== REGISTER ====================
export const signUp = async (userData) => {
  try {
    const response = await api.post("/register", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Signup failed" };
  }
};

// ==================== LOGIN ====================
export const login = async (loginData) => {
  try {
    const response = await api.post("/login", loginData);

    // Store JWT token
    localStorage.setItem("token", response.jwt);
    localStorage.setItem("data", JSON.stringify(response.data));

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Login failed" };
  }
};

// ==================== AUTH HEADER HELPER ====================
export const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export default api;
import axios from "axios";

const baseURL = (process.env.REACT_APP_API_BASE_URL || "").replace(/\/$/, "");

const api = axios.create({
  baseURL: `${baseURL}/api`,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export default api;

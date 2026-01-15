import axios from "axios";

const baseURL = (process.env.REACT_APP_API_BASE_URL || "").replace(/\/$/, "");

const api = axios.create({
  baseURL: `${baseURL}/api`,
});

export default api;

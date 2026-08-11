import axios from "axios";

// withCredentials is essential — your backend sets accessToken/refreshToken
// as httpOnly cookies, so every request needs to carry them automatically.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ,
  withCredentials: true
});

export default api;

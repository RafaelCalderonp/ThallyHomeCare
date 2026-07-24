import axios from "axios";

// En desarrollo usa el proxy de Vite hacia el backend local ("/api").
// En producción (Cloudflare Pages) define VITE_API_URL con la URL completa
// del backend en Render, ej: https://thallyhomecare-backend.onrender.com/api
const baseURL = import.meta.env.VITE_API_URL || "/api";

export const api = axios.create({ baseURL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

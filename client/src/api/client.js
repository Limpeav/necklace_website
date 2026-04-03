import axios from "axios";

const normalizeBaseUrl = (value) => value?.trim().replace(/\/$/, "");

const buildRenderApiUrl = (hostname) => {
  if (!hostname?.endsWith(".onrender.com") || !hostname.includes("-client")) {
    return null;
  }

  return `https://${hostname.replace("-client", "-api")}/api`;
};

const resolveApiBaseUrl = () => {
  const configuredUrl = normalizeBaseUrl(import.meta.env.VITE_API_URL);
  if (configuredUrl) {
    return configuredUrl;
  }

  if (typeof window === "undefined") {
    return "http://localhost:5001/api";
  }

  const { hostname, origin } = window.location;
  if (hostname === "localhost" || hostname === "127.0.0.1") {
    return "http://localhost:5001/api";
  }

  const inferredRenderUrl = buildRenderApiUrl(hostname);
  if (inferredRenderUrl) {
    return inferredRenderUrl;
  }

  return `${origin}/api`;
};

const api = axios.create({
  baseURL: resolveApiBaseUrl(),
  timeout: 15000
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("lunelle_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

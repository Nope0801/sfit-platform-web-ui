import axios, { AxiosInstance } from "axios";

const baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

const apiClient: AxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

apiClient.interceptors.request.use((config) => {
  try {
    const urlPath = (config.url || '').toString();
    // endpoint :?
    const isAuthEndpoint = /\/auth\/(login|register|refresh)/.test(urlPath);
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("accessToken")
        : null;
    if (token && !isAuthEndpoint) {
      config.headers = config.headers || {};
      (config.headers as Record<string, string>)[
        "Authorization"
      ] = `Bearer ${token}`;
    }
  } catch {}
  return config;
});



export default apiClient;
import axios from "axios";

const apiClient = axios.create({
  baseURL: "/api", 
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.token = token;
  }

  return config;
});

export default apiClient;
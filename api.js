// api.js

import axios from "axios";

const api = axios.create({
    baseURL: "https://9700-118-99-91-9.ngrok-free.app/api", // Replace with your API's base URL
});

api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("jwtToken"); // Retrieve your token from local storage or another source
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      config.headers["Content-Type"] = "application/json";
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
export default api;
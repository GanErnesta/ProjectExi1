// api.js

import axios from "axios";

const api = axios.create({
    baseURL: "https://5b65-118-99-91-15.ngrok-free.app/api", // Replace with your API's base URL
});

api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("jwtToken"); // Retrieve your token from local storage or another source
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      config.headers["Content-Type"] = "application/json";
      config.headers["ngrok-skip-browser-warning"] = "69420";

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
export default api;
// api.js

import axios from "axios";
const cors = require('cors');

const api = axios.create({
    baseURL: "https://brand.playease.site", // Replace with your API's base URL
});

api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("jwtToken"); // Retrieve your token from local storage or another source
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      config.headers["Content-Type"] = "application/json";
      config.headers["ngrok-skip-browser-warning"] = "69420";
      config.headers["Access-Control-Allow-Origin"] = "*";
      config.headers["Access-Control-Allow-Methods"] = "GET,PUT,POST,DELETE,PATCH,OPTIONS";
      config.headers["Access-Control-Allow-Headers"] = "Origin, X-Requested-With, Content-Type, Accept, Authorization";
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
export default api;
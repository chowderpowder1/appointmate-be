import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 1000,
});

api.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err.code === "ECONNABORTED") throw new Error("Request timed out.");
      if (!err.response) throw new Error("Network error.");
      throw new Error(err.response.data?.message || "Server error.");
    }
)
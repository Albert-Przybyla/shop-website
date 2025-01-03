import { TOKEN_KEY } from "@/lib/constants";
import axios from "axios";
import Cookies from "js-cookie";

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/`,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get(TOKEN_KEY);
    if (token) {
      config.headers.set("Authorization", "Bearer " + token);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

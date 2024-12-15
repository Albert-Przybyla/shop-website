import axios from "axios";

export const api = axios.create({
  baseURL: `http://localhost:9005`,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

import axios from "axios";

export const api = axios.create({
  baseURL: `https://user-api.blue-elephant.pl`,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

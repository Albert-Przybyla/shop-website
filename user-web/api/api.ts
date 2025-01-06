import axios from "axios";

export const api = axios.create({
  baseURL: `http://185.201.112.115:8081`,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

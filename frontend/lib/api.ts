import axios from "axios";

export const api = axios.create({
  baseURL: "http://YOUR_IP:4000",
  headers: { "Content-Type": "application/json" },
});

import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const api = axios.create({
  baseURL: "http://YOUR_IP:4000",
  headers: { "Content-Type": "application/json" },
});

const API_URL = "http://localhost:4000";
export const createProfile = async (token: string, payload: any) => {
  const res = await fetch(`${API_URL}/profile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Profile failed");

  return data;
};
export const getMe = async () => {
  const token = await SecureStore.getItemAsync("token");

  const res = await api.get("/api/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data as { needsProfile: boolean };
};

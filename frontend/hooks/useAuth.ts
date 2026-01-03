import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";

export function useAuth() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    SecureStore.getItemAsync("token").then((t) => {
      setToken(t);
      setLoading(false);
    });
  }, []);

  const saveToken = async (t: string) => {
    await SecureStore.setItemAsync("token", t);
    setToken(t);
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync("token");
    setToken(null);
  };

  return {
    token,
    saveToken,
    logout,
    loading,
    isAuthenticated: !!token,
  };
}

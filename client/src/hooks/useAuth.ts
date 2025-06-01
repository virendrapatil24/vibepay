import { useState } from "react";

export const useAuth = () => {
  const [user, setUser] = useState(() => {
    return !!localStorage.getItem("vibepayAuthToken");
  });

  const login = (token: string) => {
    localStorage.setItem("vibepayAuthToken", token);
    setUser(true);
  };

  const logout = () => {
    localStorage.removeItem("vibepayAuthToken");
    setUser(false);
  };

  return { user, login, logout };
};

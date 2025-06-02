import { useState } from "react";

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  id: string;
  password: string;
}

interface UpdateProfile {
  firstName?: string;
  lastName?: string;
  password?: string;
}

export const useAuth = () => {
  const [user, setUser] = useState(() => {
    const userStr = localStorage.getItem("vibepayUser");
    return userStr ? JSON.parse(userStr) : null;
  });

  const login = (token: string, userData: UserProfile) => {
    localStorage.setItem("vibepayAuthToken", token);
    localStorage.setItem("vibepayUser", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("vibepayAuthToken");
    localStorage.removeItem("vibepayUser");
    setUser(null);
  };

  const update = (userUpdateData: UpdateProfile) => {
    localStorage.setItem("vibepayUser", JSON.stringify(userUpdateData));
    setUser(userUpdateData);
  };
  return { user, login, logout, update };
};

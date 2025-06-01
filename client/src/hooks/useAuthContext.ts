import { createContext, useContext } from "react";
import { useAuth } from "./useAuth";

export const AuthContext = createContext<ReturnType<typeof useAuth> | null>(
  null
);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuthContext must be used within AuthProvider");
  return context;
};

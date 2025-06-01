import { ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";
import { AuthContext } from "../hooks/useAuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const auth = useAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

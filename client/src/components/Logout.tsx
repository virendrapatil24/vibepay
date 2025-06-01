import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const Logout = () => {
  const { logout } = useAuthContext();
  useEffect(() => {
    logout();
  }, [logout]);

  return <Navigate to="/" replace />;
};

export default Logout;

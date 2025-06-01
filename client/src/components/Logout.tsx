import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const Logout = ({ onLogout }: { onLogout: () => void }) => {
  useEffect(() => {
    onLogout();
  }, [onLogout]);

  return <Navigate to="/" replace />;
};

export default Logout;

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { useEffect, useState } from "react";
import Logout from "./components/Logout";

const isAuthenticated = () => {
  return !!localStorage.getItem("vibepayAuthToken");
};

function App() {
  const [user, setUser] = useState(false);

  useEffect(() => {
    setUser(isAuthenticated);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("vibepayAuthToken");
    setUser(false);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route path="/logout" element={<Logout onLogout={handleLogout} />} />
        <Route
          path="/signup"
          element={user ? <Navigate to="/" /> : <SignupPage />}
        />
        <Route path="/" element={<LandingPage user={user} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;

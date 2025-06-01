import { Menu } from "lucide-react";
import AppLogo from "../assets/images/vibepay_logo.png";
import MenuLinks from "./MenuLinks";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const menuOptions = [
  { name: "About", path: "#" },
  { name: "Features", path: "#" },
  { name: "Update", path: "#" },
  { name: "Help", path: "#" },
  { name: "Customers", path: "#" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  return (
    <div className="bg-black">
      <div className="container">
        <div className="flex justify-between items-center py-4">
          <div className="relative">
            <div className="absolute top-2 bottom-0 w-full bg-[linear-gradient(#a0facb,#63f2b0,#01c87a,#008253,#003021)] blur-md"></div>
            <img
              src={AppLogo}
              alt="vibepay_logo"
              className="h-12 w-12 relative rounded-lg"
            />
          </div>
          <Menu className="text-white h-10 w-10 sm:hidden" />
          <nav className="items-center gap-6 hidden sm:flex">
            {menuOptions.map((options, index) => (
              <MenuLinks name={options.name} path={options.path} key={index} />
            ))}
            {user ? (
              <button
                className="bg-white/90 hover:bg-white py-2 px-4 rounded-lg transition duration-300"
                onClick={() => navigate("/logout")}
              >
                Sign Out
              </button>
            ) : (
              <>
                <button
                  className="text-white/80 hover:text-white underline transition duration-300"
                  onClick={() => navigate("/login")}
                >
                  Log In
                </button>
                <button
                  className="bg-white/90 hover:bg-white py-2 px-4 rounded-lg transition duration-300"
                  onClick={() => navigate("/signup")}
                >
                  Get started
                </button>
              </>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

import AppLogo from "../assets/images/vibepay_logo.png";
import MenuLinks from "./MenuLinks";

const menuOptions = [
  { name: "About", path: "#" },
  { name: "Features", path: "#" },
  { name: "Update", path: "#" },
  { name: "Help", path: "#" },
  { name: "Customers", path: "#" },
];

const Navbar = () => {
  return (
    <div className="bg-black">
      <div className="container">
        <div className="flex justify-between items-center py-4">
          <div>
            <img src={AppLogo} alt="vibepay_logo" className="h-12 w-12" />
          </div>
          <nav className="items-center flex gap-6">
            {menuOptions.map((options, index) => (
              <MenuLinks name={options.name} path={options.path} key={index} />
            ))}
            {/* <button className="bg-white py-2 px-4 rounded-lg">Log In</button> */}
            <button className="bg-white py-2 px-4 rounded-lg">Sign Up</button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

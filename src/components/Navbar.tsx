import { Link } from "react-router-dom";
import { Navbar as NextUINavbar, NavbarBrand } from "@nextui-org/react";

const Navbar = () => {
  return (
    <NextUINavbar
      maxWidth="full"
      className="bg-indigo-700 h-16 border-b border-indigo-600 shadow-md"
    >
      <NavbarBrand>
        <Link to="/" className="font-bold text-white text-xl ml-4">
          ABC Company
        </Link>
      </NavbarBrand>
    </NextUINavbar>
  );
};

export default Navbar;

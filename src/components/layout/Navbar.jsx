import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarToggle,
} from "flowbite-react";

import logo from "../../assets/images/VibeFlowDark.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
// Optional: Import your custom button if you want consistency,
// or just use Tailwind classes as shown below for speed.

export default function VibeNav() {
  const { token, setToken, userData } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLogout() {
    setToken(null);
    localStorage.removeItem("token");
    navigate("/login");
  }

  const navLinkStyles = ({ isActive }) => {
    return `
      block py-3 px-4 md:p-0 w-full text-center
      text-base font-medium transition-all duration-300 
      ${
        isActive
          ? "text-blue-400 scale-105"
          : "text-gray-300 hover:text-white hover:scale-105"
      }
    `;
  };

  return (
    <Navbar
      fluid
      rounded
      className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md dark:bg-gray-900/80 dark:border-gray-700"
    >
      <NavbarBrand as={Link} to="/" className="ml-2 md:ml-4">
        <img src={logo} className="mr-3 h-8 sm:h-9" alt="VibeFlow Logo" />
      </NavbarBrand>

      <div className="flex items-center gap-2 md:order-2 mr-2 md:mr-4">
        {token ? (
          /* ================= LOGGED IN STATE (Avatar Dropdown) ================= */
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="User settings"
                img={
                  userData?.photo ||
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                }
                rounded
                className="hover:opacity-80 transition-opacity ring-2 ring-blue-500/50 rounded-full"
              />
            }
          >
            <DropdownHeader>
              <span className="block text-sm font-semibold text-gray-900 dark:text-white">
                {userData?.name}
              </span>
              <span className="block truncate text-sm text-gray-500 dark:text-gray-400">
                {userData?.email}
              </span>
            </DropdownHeader>
            <DropdownItem as={Link} to="/profile" className="font-medium">
              Profile
            </DropdownItem>
            <DropdownDivider />
            <DropdownItem
              as="button"
              onClick={handleLogout}
              className="font-medium text-red-600 hover:bg-red-50 dark:text-red-500 dark:hover:bg-red-900/20"
            >
              Sign out
            </DropdownItem>
          </Dropdown>
        ) : (
          /* ================= LOGGED OUT STATE (Visible Buttons) ================= */
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-gray-300 hover:text-white font-medium transition-colors text-sm sm:text-base"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-lg shadow-blue-600/20"
            >
              Register
            </Link>
          </div>
        )}

        {/* Only show the hamburger menu toggle if the user is logged in (since nav links are hidden otherwise) */}
        {token && <NavbarToggle />}
      </div>

      {token && (
        <NavbarCollapse className="md:gap-10 [&>ul]:items-center">
          <NavLink to="/" className={navLinkStyles}>
            Home
          </NavLink>
          <NavLink to="/profile" className={navLinkStyles}>
            Profile
          </NavLink>
        </NavbarCollapse>
      )}
    </Navbar>
  );
}

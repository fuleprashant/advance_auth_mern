import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"; // Assuming you use React Router for navigation
import { logoutUser } from "../../services/auth.service";
import avatar from "../../assets/avatar.png";

const Navbar = () => {
  const [dropdown, setDropdown] = useState(false);
  const { user, isAuthenticate } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };
  // const handleSignOut = async () => {
  //   try {
  //     const result = await logout();
  //     if (result.status === "success") {
  //       toast.success(result.message);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Failed to log out. Please try again later");
  //   }
  // };

  const handleSignOut = async () => {
    // console.log("logout button is clicked");
    try {
      const result = await logoutUser();
      console.log("the result is", result);
      localStorage.removeItem("user-info");
      if (result.status === "Success") {
        toast.success(result.message);
      }

      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Failed to log out. Please try again later");
    }
  };

  // const userData = localStorage.getItem("user-info");
  // const inidvitualUserData = JSON.parse(userData);

  const userData = localStorage.getItem("user-info");
  const inidvitualUserData = JSON.parse(userData);

  return (
    <nav className="bg-gray-800 text-white px-4 py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or Brand */}
        <div className="text-2xl font-bold">
          <Link to="/">To-Do App</Link>
        </div>

        {/* Profile Section */}
        {isAuthenticate && (
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center space-x-2 focus:outline-none"
              aria-expanded={dropdown}
              aria-haspopup="true"
            >
              {/* User's Avatar */}
              <img
                src={avatar} // Replace with user's avatar or a placeholder image
                alt="User Avatar"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              {/* Username */}
              <span>{inidvitualUserData?.name || "Username"}</span>
              {/* Dropdown Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.292 7.293a1 1 0 011.415 0L10 10.586l3.293-3.293a1 1 0 011.415 1.415l-4 4a1 1 0 01-1.415 0l-4-4a1 1 0 010-1.415z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {/* Dropdown Menu */}
            {dropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg py-2 z-10 transition ease-in-out duration-300">
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  My Profile
                </Link>
                <button
                  onClick={handleSignOut}
                  className="block px-4 py-2 w-full text-left hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

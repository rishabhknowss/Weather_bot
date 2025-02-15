import React, { useState } from "react";
import { FiHome, FiChevronDown, FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

export default function Navbar({ user, setUser, onLogout }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleDropdownToggle = () => setDropdownOpen(!dropdownOpen);
  const handleMenuToggle = () => setMenuOpen(!menuOpen);

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfo = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
          }
        );
        setUser(userInfo.data);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    },
    onError: (error) => console.error("Login failed:", error),
  });

  const logout = () => {
    onLogout();
    setDropdownOpen(false);
  };

  return (
    <nav className="bg-white/10 backdrop-blur-md rounded-full py-3 px-4 sm:px-6 sticky top-4 z-50 shadow-lg mx-auto border border-white/20 max-w-7xl">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-900">
          🌩️ Telegram Bot Weather
        </h1>

        <button
          onClick={handleMenuToggle}
          className="md:hidden text-gray-800 text-2xl focus:outline-none"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } md:flex items-center space-y-4 md:space-y-0 md:space-x-8 mt-4 md:mt-0 transition-all absolute md:relative top-full left-0 right-0 bg-white/90 md:bg-transparent p-4 md:p-0 rounded-b-2xl md:rounded-none`}
        >
          <a
            href="/"
            className="text-gray-800 hover:text-blue-500 transition font-medium flex items-center"
          >
            <FiHome className="mr-2" /> Home
          </a>
          <a
            href="https://twitter.com/rishabhknows"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 hover:text-blue-500 transition font-medium"
          >
            Contact
          </a>

          {!user ? (
            <button
              onClick={login}
              className="cursor-pointer bg-gray-800 text-white px-6 py-2 rounded-full flex items-center font-medium hover:bg-gray-700 transition"
            >
              <FcGoogle className="w-5 h-5 mr-2" />
              Login
            </button>
          ) : (
            <div className="relative">
              <button
                onClick={handleDropdownToggle}
                className="cursor-pointer flex items-center space-x-2 bg-gray-800 text-white px-4 py-2 rounded-full font-medium hover:bg-gray-700 transition"
              >
                <span>{user.name.split(" ")[0]}</span>
                <FiChevronDown className="w-4 h-4" />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg z-10">
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center"
                  >
                    <FiLogOut className="mr-2" /> Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

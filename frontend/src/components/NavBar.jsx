import React, { useState } from "react";
import { Link } from "react-router-dom";
const NavBar = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isConnectWallet, setIsConnectWallet] = useState(false);
  const toggleMenu = () => {
    // console.log(isMenuVisible);
    setIsMenuVisible(!isMenuVisible);
    setIsConnectWallet(false);
    // console.log(isMenuVisible);
  };
  const toggleConnectWallet = () => {
    setIsMenuVisible(false);
    setIsConnectWallet(!isConnectWallet);
  };

  return (
    <div className="max-w-2xl mx-auto mt-4">
      <nav className="border-gray-200">
        <div className="container mx-auto flex flex-wrap items-center justify-between">
          <a href="#" className="flex">
            <span className="self-center text-lg font-semibold whitespace-nowrap">
              Logo
            </span>
          </a>
          <button
            data-collapse-toggle="mobile-menu"
            type="button"
            className="md:hidden ml-3 text-gray-400 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-lg inline-flex items-center justify-center"
            aria-controls="mobile-menu-2"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            <svg
              className="hidden w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <div className="hidden md:block w-full md:w-auto" id="mobile-menu">
            <ul className="flex-col md:flex-row flex md:space-x-8 mt-4 md:mt-0 md:text-sm md:font-medium">
              <li className="cursor-pointer">
                <Link
                  to="/"
                  className="cursor-pointer bg-blue-700 md:bg-transparent text-white block pl-3 pr-4 py-2 md:text-blue-700 md:p-0 rounded focus:outline-none"
                >
                  Home
                </Link>
              </li>

              <li className="relative">
                <select
                  id="dropdownNavbarLink"
                  data-dropdown-toggle="dropdownNavbar"
                  className="text-gray-700 hover:bg-gray-50 border-b bg-transparent border-gray-100 md:hover:bg-transparent md:border-0 pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0 font-medium flex items-center justify-between w-full md:w-auto"
                  
                >
                  <option>Ethereum</option>
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="white"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  {isMenuVisible && (
                    <div
                      id="dropdownNavbar"
                      className="absolute  text-base z-10 list-none divide-y divide-gray-100 rounded  my-4 w-44 bg-opacity-10 bg-white backdrop-blur-lg shadow-lg"
                    >
                      <ul
                        className="py-1"
                        aria-labelledby="dropdownLargeButton"
                      >
                        <li>
                          <a
                            href="#"
                            className="text-sm hover:bg-gray-100 hover:text-black text-gray-400 block px-4 py-2"
                          >
                            Dashboard
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="text-sm hover:bg-gray-100 hover:text-black text-gray-400 block px-4 py-2"
                          >
                            Settings
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="text-sm hover:bg-gray-100 hover:text-black text-gray-400 block px-4 py-2"
                          >
                            Earnings
                          </a>
                        </li>
                        <div className="">
                          <a
                            href="#"
                            className="text-sm py-1 hover:bg-gray-100 hover:text-black text-gray-400 block px-4 py-2"
                          >
                            Sign out
                          </a>
                        </div>{" "}
                      </ul>
                    </div>
                  )}
                </select>
              </li>
              <li className="relative">
                <button
                  id="dropdownNavbarLink"
                  data-dropdown-toggle="dropdownNavbar"
                  className="text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0 font-medium flex items-center justify-between w-full md:w-auto"
                  onClick={toggleConnectWallet}
                >
                  Provider
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="white"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
                {isConnectWallet && (
                  <div
                    id="dropdownNavbar"
                    className="absolute  text-base z-10 list-none divide-y divide-gray-100 rounded  my-4 w-44 bg-opacity-10 bg-white backdrop-blur-lg shadow-lg"
                  >
                    <ul className="py-1" aria-labelledby="dropdownLargeButton">
                      <li>
                        <a
                          href="#"
                          className="text-sm hover:bg-gray-100 hover:text-black text-gray-400 block px-4 py-2"
                        >
                          Dashboard
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-sm hover:bg-gray-100 hover:text-black text-gray-400 block px-4 py-2"
                        >
                          Settings
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-sm hover:bg-gray-100 hover:text-black text-gray-400 block px-4 py-2"
                        >
                          Earnings
                        </a>
                      </li>
                      <div className="">
                        <a
                          href="#"
                          className="text-sm py-1 hover:bg-gray-100 hover:text-black text-gray-400 block px-4 py-2"
                        >
                          Sign out
                        </a>
                      </div>{" "}
                    </ul>
                  </div>
                )}
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 hover:bg-gray-50 border-b border-gray-100"
                ></a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;

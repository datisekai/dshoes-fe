import React from "react";
import { logo } from "../../config/base";
import "../../assets/css/index.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBarsStaggered,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { useSideBar } from "../../store/displayBar";

const Header = () => {
  const sidebar = useSideBar(state => state.sidebar)
  const setSidebar = useSideBar(state => state.setSidebar)

  return (
    <header className="flex justify-around items-center bg-[#2A2A2A]">
      <div>
        <Link to="/">
          {" "}
          <img
            className="w-[60%] sm:w-[60%] md:w-[50%] lg:w-[70%] cursor-pointer"
            src={logo}
            alt=""
          />
        </Link>
      </div>
      <ul className=" justify-center hidden md:flex">
        <li
          className="px-1 sm:px-2 md:px-3 lg:px-4 text-gray-300 transition-transform cursor-pointer relative"
          id="menuParent"
        >
          Menu
          <ul
            className="absolute z-10 hidden transition-transform"
            id="menuChildren"
          >
            <Link to="/nike">
              <li className="hover:bg-[#007BFF] px-1 rounded-sm">Nike</li>
            </Link>
            <Link to="/jordan">
              <li className="hover:bg-[#007BFF] px-1 rounded-sm">Jordan</li>
            </Link>
            <Link to="/adidas">
              <li className="hover:bg-[#007BFF] px-1 rounded-sm">Adidas</li>
            </Link>
          </ul>
        </li>

        <Link to="/cart">
          {" "}
          <li className="px-1 sm:px-2 md:px-3 lg:px-4 text-gray-300 hover:text-gray-400 transition-transform cursor-pointer">
            Cart
          </li>
        </Link>

        <Link to="/contact">
          {" "}
          <li className="px-1 sm:px-2 md:px-3 lg:px-4 text-gray-300 hover:text-gray-400 transition-transform cursor-pointer">
            Contact
          </li>
        </Link>
        <Link to="/login">
          <li className="px-1 sm:px-2 md:px-3 lg:px-4 text-red-400 hover:text-red-500 transition-transform cursor-pointer">
            Login
          </li>
        </Link>
        <Link to="/search">
          {" "}
          <li className="px-1 sm:px-2 md:px-3 lg:px-4 text-red-400 hover:text-red-500 transition-transform cursor-pointer">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </li>
        </Link>
      </ul>
      <ul className="md:hidden flex justify-center px-4">
        <Link to='/search'><li className="text-red-400 px-2 cursor-pointer"><i className="fa-solid fa-magnifying-glass"></i></li></Link>
        <li className="text-red-300 px-2 cursor-pointer">
          <FontAwesomeIcon icon={faBarsStaggered} onClick={() => {setSidebar(true);}} />
        </li>
      </ul>
    </header>
  );
};

export default Header;

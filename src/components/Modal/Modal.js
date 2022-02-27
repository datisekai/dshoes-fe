import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../../assets/css/index.css";
import { useSideBar } from "../../store/displayBar";

const Modal = () => {
  const sidebar = useSideBar((state) => state.sidebar);
  const setSidebar = useSideBar((state) => state.setSidebar);

  return (
    <div className={`w-full h-full ${sidebar ? "block" : "hidden"}`}>
      <div
        className="fixed top-0 left-0 bottom-0 right-0 bg-[rgba(0,0,0,0.3)] z-50"
        onClick={() => setSidebar(false)}
      ></div>
      <div className="fixed right-0 bottom-0 rounded-md top-0 z-[60] bg-[#2a2a2a] w-[50%] p-5">
        <div className="flex justify-between border-b border-[#007BFF] pb-5">
          <h1 className="uppercase underlined-blue text-xl text-gray-100">
            MENU
          </h1>
          <i
            className="text-xl text-gray-100 hover:text-gray-400 cursor-pointer transition-all fa-solid fa-xmark"
            onClick={() => setSidebar(false)}
          ></i>
        </div>

        <ul className="mt-3">
          <Link to={"/"}>
            {" "}
            <li className="text-gray-200 uppercase py-2">
              <i className="fa-solid fa-house"></i> Home
            </li>
          </Link>
          <Link to={"/nike"}>
            <li className="text-gray-200 uppercase py-2">
              <i className="fa-brands fa-atlassian"></i> NIKE
            </li>
          </Link>
          <Link to={"/adidas"}>
            {" "}
            <li className="text-gray-200 uppercase py-2">
              <i className="fa-brands fa-atlassian"></i> ADIDAS
            </li>
          </Link>
          <Link to={"/jordan"}>
            {" "}
            <li className="text-gray-200 uppercase py-2">
              <i className="fa-brands fa-atlassian"></i> JORDAN
            </li>
          </Link>
          <Link to={"/cart"}>
            <li className="text-gray-200 uppercase py-2">
              <i className="fa-solid fa-cart-shopping"></i> Cart
            </li>
          </Link>
          <Link to={"/contact"}>
            <li className="text-gray-200 uppercase py-2">
              <i className="fa-solid fa-address-card"></i> Contact
            </li>
          </Link>
          <Link to={"/login"}>
            {" "}
            <li className="text-red-400 uppercase py-2">
              <i className="fa-solid fa-right-to-bracket"></i> Login
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Modal;

import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../../assets/css/index.css";
import { useSideBar } from "../../store/displayBar";

const Modal = () => {
  const sidebar = useSideBar((state) => state.sidebar);
  const setSidebar = useSideBar((state) => state.setSidebar);
  const userInfo = useSelector((state) => state.user);
  const { type } = useSelector((state) => state.type);

  return (
    <div
      className={`tw-w-full tw-h-full ${sidebar ? "tw-block" : "tw-hidden"}`}
    >
      <div
        className='tw-fixed tw-top-0 tw-left-0 tw-bottom-0 tw-right-0 tw-bg-[rgba(0,0,0,0.3)] tw-z-50'
        onClick={() => setSidebar(false)}
      ></div>
      <div className='tw-fixed tw-right-0 tw-bottom-0 tw-rounded-md tw-top-0 tw-z-[60] tw-bg-[#2a2a2a] tw-w-[50%] tw-p-5'>
        <div className='tw-flex tw-justify-between tw-border-b tw-border-[#007BFF] tw-pb-5'>
          <h1 className='tw-uppercase underlined-blue tw-text-xl tw-text-gray-100'>
            MENU
          </h1>
          <i
            className='tw-text-xl tw-text-gray-100 hover:tw-text-gray-400 tw-cursor-pointer tw-transition-all fa-solid fa-xmark'
            onClick={() => setSidebar(false)}
          ></i>
        </div>

        <ul className='tw-mt-3'>
          <NavLink
            activeclassname='active'
            className={"tw-block"}
            to={"/"}
            onClick={() => setSidebar(false)}
          >
            {" "}
            <li className='tw-block tw-text-gray-200 tw-uppercase tw-py-2'>
              <i className='fa-solid fa-house'></i> Home
            </li>
          </NavLink>
          <NavLink
            activeclassname='active'
            className={"tw-block"}
            to={"/products"}
            onClick={() => setSidebar(false)}
          >
            {" "}
            <li className='tw-text-gray-200 tw-uppercase tw-py-2'>
              <i className='fa-brands fa-product-hunt'></i> Products
            </li>
          </NavLink>

          <NavLink
            activeclassname='active'
            className={"tw-block"}
            to={"/cart"}
            onClick={() => setSidebar(false)}
          >
            <li className='tw-text-gray-200 tw-uppercase tw-py-2'>
              <i className='fa-solid fa-cart-shopping'></i> Cart
            </li>
          </NavLink>
          {userInfo && userInfo.user && (
            <NavLink
              activeclassname='active'
              className={"tw-block"}
              to={"/history-order"}
              onClick={() => setSidebar(false)}
            >
              <li className='tw-text-gray-200 tw-uppercase tw-py-2'>
                <i className='fa-brands fa-jedi-order'></i> Order
              </li>
            </NavLink>
          )}
          <NavLink
            activeclassname='active'
            className={"tw-block"}
            to={"/contact"}
            onClick={() => setSidebar(false)}
          >
            <li className='tw-text-gray-200 tw-uppercase tw-py-2'>
              <i className='fa-solid fa-address-card'></i> Contact
            </li>
          </NavLink>

          {userInfo && userInfo?.user?.roles.length > 2 && (
            <NavLink
              activeclassname='active'
              className={"tw-block"}
              to={"/admin"}
              onClick={() => setSidebar(false)}
            >
              <li className='tw-text-gray-200 tw-uppercase tw-py-2'>
                <i className='fa-solid fa-address-card'></i> ADMIN
              </li>
            </NavLink>
          )}

          {userInfo && !userInfo.user && (
            <Link to={"/login"} onClick={() => setSidebar(false)}>
              {" "}
              <li className='tw-text-red-400 tw-uppercase tw-py-2'>
                <i className='fa-solid fa-right-to-bracket'></i> Login
              </li>
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Modal;

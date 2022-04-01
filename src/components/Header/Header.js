import {
  faBarsStaggered
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import swal from "sweetalert";
import "../../assets/css/index.css";
import { logo } from "../../config/base";
import { deleteUser } from "../../redux/userReducer";
import { useSideBar } from "../../store/displayBar";

const Header = () => {
  const sidebar = useSideBar((state) => state.sidebar);
  const setSidebar = useSideBar((state) => state.setSidebar);
  const userInfo = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const search = useSelector((state) => state.search.text);


  const handleLogout = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        sessionStorage.removeItem("token");
        dispatch(deleteUser());
        toast.info("Logout successfully!");
        navigate("/");
      }
    });
  };

  console.log(userInfo);

  return (
    <div className="bg-[#2A2A2A]">
      <header className="flex justify-between items-center max-w-[1200px] mx-auto">
        <div className="">
          <Link to="/">
            {" "}
            <img
              className="w-[130px] sm:w-[150px] md:w-[170px] lg:w-[150px] cursor-pointer"
              src={logo}
              alt=""
            />
          </Link>
        </div>
        
        <ul className=" justify-end hidden md:flex items-center ">
          <NavLink to="/" activeclassname="active">
            {" "}
            <li className="px-1 sm:px-2 md:px-3 lg:px-4 text-gray-300 hover:text-gray-400 transition-transform cursor-pointer">
              Home
            </li>
          </NavLink>
          <NavLink activeclassname="active" to="/products">
            <li
              className="px-1 sm:px-2 md:px-3 lg:px-4 text-gray-300 transition-transform cursor-pointer relative"
              id="menuParent"
            >
              Products
            </li>
          </NavLink>

          <NavLink activeclassname="active" to="/cart">
            {" "}
            <li className="px-1 sm:px-2 md:px-3 lg:px-4 text-gray-300 hover:text-gray-400 transition-transform cursor-pointer">
              Cart
            </li>
          </NavLink>

          <NavLink activeclassname='active' to="/contact">
            {" "}
            <li className="px-1 sm:px-2 md:px-3 lg:px-4 text-gray-300 hover:text-gray-400 transition-transform cursor-pointer">
              Contact
            </li>
          </NavLink>
          {userInfo && !userInfo.user && (
            <Link to="/login">
              <li className="px-1 sm:px-2 md:px-3 lg:px-4 text-red-400 hover:text-red-500 transition-transform cursor-pointer">
                Login
              </li>
            </Link>
          )}
        {userInfo && userInfo.user && <NavLink activeclassname='active' to="/history-order">
            {" "}
            <li className="px-1 sm:px-2 md:px-3 lg:px-4 text-gray-300 hover:text-gray-400 transition-transform cursor-pointer">
              Order
            </li>
          </NavLink>}
          {userInfo && userInfo.user && (
            <li
              className="px-1 sm:px-2 md:px-3 lg:px-4 text-red-400 hover:text-red-500 transition-transform cursor-pointer"
              id="menuLoginParent"
            >
              <img
                src={`https://joeschmoe.io/api/v1/${userInfo.user.userInfo.email}`}
                className="w-[45px] h-[45px] rounded-full "
                alt=""
              />
              <ul
                className="absolute hidden z-10 right-0 2xl:right-auto bg-[#2a2a2a] px-1 py-2 transition-all rounded-md py-1"
                id="menuLogin"
              >
                <li className="px-1 py-1 mt-1 text-sm uppercase transition-all hover:text-red-700">
                  <i className="fa-solid fa-id-card"></i>{" "}
                  {userInfo.user.userInfo.email && userInfo.user.userInfo.email}
                </li>
                <li
                  className="px-1 py-1 mt-1 text-sm uppercase transition-all hover:text-red-700"
                  onClick={handleLogout}
                >
                  <i className="fa-solid fa-right-from-bracket"></i> Logout
                </li>
              </ul>
            </li>
          )}
        </ul>
        <ul className="md:hidden flex justify-center items-center px-4">
          {userInfo && userInfo.user && (
            <li
              className="px-1 sm:px-2 md:px-3 lg:px-4 text-red-400 hover:text-red-500 transition-transform cursor-pointer relative"
              id="menuLoginParent"
            >
              <img
                src={`https://joeschmoe.io/api/v1/${userInfo.user.userInfo.email}`}
                className="w-[30px] h-[30px] rounded-full "
                alt=""
              />
              <ul
                className="absolute hidden z-10 right-0 bg-[#2a2a2a] px-1 py-2 transition-all rounded-md py-1"
                id="menuLogin"
              >
                <li className="px-1 py-1 mt-1 text-sm uppercase transition-all hover:text-red-700 truncate">
                  <i className="fa-solid fa-id-card"></i>{" "}
                  {userInfo.user.userInfo.email && userInfo.user.userInfo.email}
                </li>
                <li
                  className="px-1 py-1 mt-1 text-sm uppercase transition-all hover:text-red-700"
                  onClick={handleLogout}
                >
                  <i className="fa-solid fa-right-from-bracket"></i> Logout
                </li>
              </ul>
            </li>
          )}
         
          <li className="text-red-300 px-2 cursor-pointer">
            <FontAwesomeIcon
              icon={faBarsStaggered}
              onClick={() => {
                setSidebar(true);
              }}
            />
          </li>{" "}
        </ul>
      </header>
    </div>
  );
};

export default Header;

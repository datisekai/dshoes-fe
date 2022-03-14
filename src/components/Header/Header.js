import React from "react";
import { logo } from "../../config/base";
import "../../assets/css/index.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBarsStaggered,
  faHand,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { useSideBar } from "../../store/displayBar";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../../redux/userReducer";
import swal from "sweetalert";
import { toast } from "react-toastify";

const Header = () => {
  const sidebar = useSideBar((state) => state.sidebar);
  const setSidebar = useSideBar((state) => state.setSidebar);
  const userInfo = useSelector((state) => state.user.user.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { type } = useSelector((state) => state.type);

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
      <ul className=" justify-center hidden md:flex items-center">
        <li
          className="px-1 sm:px-2 md:px-3 lg:px-4 text-gray-300 transition-transform cursor-pointer relative"
          id="menuParent"
        >
          Menu
          <ul
            className="absolute z-10 hidden transition-transform bg-[#2a2a2a] px-1 py-2 transition-all rounded-md"
            id="menuChildren"
          >
            {type &&
              type.map((item) => (
                <Link key={item._id} to={`/${item.type}?id=${item._id}`}>
                  <li className="hover:bg-[#007BFF] px-1 rounded-sm uppercase text-sm py-1">
                    {item.type}
                  </li>
                </Link>
              ))}
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
        {!userInfo && (
          <Link to="/login">
            <li className="px-1 sm:px-2 md:px-3 lg:px-4 text-red-400 hover:text-red-500 transition-transform cursor-pointer">
              Login
            </li>
          </Link>
        )}
        <Link to="/search">
          {" "}
          <li className="px-1 sm:px-2 md:px-3 lg:px-4 text-red-400 hover:text-red-500 transition-transform cursor-pointer">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </li>
        </Link>
        {userInfo && (
          <li
            className="px-1 sm:px-2 md:px-3 lg:px-4 text-red-400 hover:text-red-500 transition-transform cursor-pointer"
            id="menuLoginParent"
          >
            <img
              src="https://source.unsplash.com/random"
              className="w-[45px] h-[45px] rounded-full "
              alt=""
            />
            <ul
              className="absolute hidden z-10 transition-transform bg-[#2a2a2a] px-1 py-2 transition-all rounded-md py-1"
              id="menuLogin"
            >
              <li className="px-1 py-1 mt-1 text-sm uppercase transition-all hover:text-red-700">
              <i className="fa-solid fa-id-card"></i> {userInfo.email && userInfo.email}
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
      <ul className="md:hidden flex justify-center px-4">
        <Link to="/search">
          <li className="text-red-400 px-2 cursor-pointer">
            <i className="fa-solid fa-magnifying-glass"></i>
          </li>
        </Link>
        <li className="text-red-300 px-2 cursor-pointer">
          <FontAwesomeIcon
            icon={faBarsStaggered}
            onClick={() => {
              setSidebar(true);
            }}
          />
        </li>
      </ul>
    </header>
  );
};

export default Header;

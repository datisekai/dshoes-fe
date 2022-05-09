import { faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Badge, Menu } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import swal from "sweetalert";
import { logo } from "../../config/base";
import { deleteUser } from "../../redux/userReducer";
import { useSideBar } from "../../store/displayBar";
import { limitCart } from "../../utils/limitCart";

const Header = () => {
  const sidebar = useSideBar((state) => state.sidebar);
  const setSidebar = useSideBar((state) => state.setSidebar);
  const userInfo = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { carts } = useSelector((state) => state.cart);
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

  return (
    <div className='tw-bg-[#2A2A2A]'>
      <header className='tw-flex tw-justify-between tw-items-center tw-max-w-[1200px] tw-mx-auto'>
        <div className=''>
          <Link to='/'>
            {" "}
            <img
              className='tw-w-[130px]  sm:tw-w-[150px] md:tw-w-[170px] lg:tw-w-[150px] tw-cursor-pointer'
              src={logo}
              alt=''
            />
          </Link>
        </div>

        <ul className=' tw-justify-end tw-hidden md:tw-flex tw-items-center '>
          <NavLink to='/' activeclassname='active'>
            {" "}
            <li className='tw-px-1 sm:tw-px-2 md:tw-px-3 lg:tw-px-4 tw-text-gray-300 tw-transition-transform tw-cursor-pointer'>
              Home
            </li>
          </NavLink>
          <NavLink activeclassname='active' to='/products'>
            <li
              className='tw-px-1 sm:tw-px-2 md:tw-px-3 lg:tw-px-4 tw-text-gray-300 tw-transition-transform tw-cursor-pointer tw-relative'
              id='menuParent'
            >
              Products
            </li>
          </NavLink>

          <NavLink activeclassname='active' to='/cart'>
            {" "}
            <li className='tw-px-1 sm:tw-px-2 tw-relative md:tw-px-3 lg:tw-px-4 tw-text-gray-300 tw-transition-transform tw-cursor-pointer'>
              Cart
              <p className='tw-absolute tw-top-[-10px] tw-bg-red-500 tw-rounded-full tw-w-[20px] tw-h-[20px] tw-text-xs tw-right-[-4px] tw-flex tw-items-center tw-justify-center'>
                {limitCart(carts?.length || 0)}
              </p>
            </li>
          </NavLink>

          <NavLink activeclassname='active' to='/contact'>
            {" "}
            <li className='tw-px-1 sm:tw-px-2 md:tw-px-3 lg:tw-px-4 tw-text-gray-300 tw-transition-transform tw-cursor-pointer'>
              Contact
            </li>
          </NavLink>
          {userInfo && !userInfo.user && (
            <Link to='/login'>
              <li className='tw-px-1 sm:tw-px-2 md:tw-px-3 lg:tw-px-4 tw-text-red-400 hover:tw-text-red-500 tw-transition-transform tw-cursor-pointer'>
                Login
              </li>
            </Link>
          )}

          {userInfo && userInfo.user && (
            <NavLink activeclassname='active' to='/history-order'>
              {" "}
              <li className='tw-px-1 sm:tw-px-2 md:tw-px-3 lg:tw-px-4 tw-text-gray-300 tw-transition-transform tw-cursor-pointer'>
                Order
              </li>
            </NavLink>
          )}
          {userInfo && userInfo.user && userInfo.user.roles.length > 2 && (
            <NavLink activeclassname='active' to='/admin'>
              {" "}
              <li className='tw-px-1 sm:tw-px-2 md:tw-px-3 lg:tw-px-4 tw-text-gray-300 tw-transition-transform tw-cursor-pointer'>
                Admin
              </li>
            </NavLink>
          )}
          {userInfo?.user && (
            <li
              className='tw-px-1 sm:tw-px-2 md:tw-px-3 lg:tw-px-4 tw-text-red-400 hover:tw-text-red-500 tw-transition-transform tw-cursor-pointer'
              id='menuLoginParent'
            >
              <Avatar
                alt='Remy Sharp'
                src={`https://joeschmoe.io/api/v1/${userInfo?.user?.userInfo?.email}`}
              />
              <ul
                className='tw-absolute tw-hidden tw-z-10 tw-right-0 2xl:tw-right-auto tw-bg-[#2a2a2a] tw-px-1 tw-py-2 tw-transition-all tw-rounded-md tw-py-1'
                id='menuLogin'
              >
                <li className='tw-px-1 tw-py-1 tw-mt-1 tw-text-sm tw-uppercase tw-transition-all hover:tw-text-red-700'>
                  <i className='fa-solid fa-id-card'></i>{" "}
                  {userInfo?.user?.userInfo?.email &&
                    userInfo?.user?.userInfo?.email}
                </li>
                <li
                  className='tw-px-1 tw-py-1 tw-mt-1 tw-text-sm tw-uppercase tw-transition-all hover:tw-text-red-700'
                  onClick={handleLogout}
                >
                  <i className='fa-solid fa-right-from-bracket'></i> Logout
                </li>
              </ul>
            </li>
          )}
        </ul>
        <ul className='md:tw-hidden tw-flex tw-justify-center tw-items-center tw-px-4'>
          {userInfo && userInfo.user && (
            <li
              className='tw-px-1 sm:tw-px-2 md:tw-px-3 lg:tw-px-4 tw-text-red-400 hover:tw-text-red-500 tw-transition-transform tw-cursor-pointer tw-relative'
              id='menuLoginParent'
            >
              <img
                src={`https://joeschmoe.io/api/v1/${userInfo?.user?.userInfo?.email}`}
                className='tw-w-[30px] tw-h-[30px] tw-rounded-full '
                alt=''
              />
              <ul
                className='tw-absolute tw-hidden tw-z-10 tw-right-0 tw-bg-[#2a2a2a] tw-px-1 tw-py-2 tw-transition-all tw-rounded-md tw-py-1'
                id='menuLogin'
              >
                <li className='tw-px-1 tw-py-1 tw-mt-1 tw-text-sm tw-uppercase tw-transition-all hover:tw-text-red-700 tw-truncate'>
                  <i className='fa-solid fa-id-card'></i>{" "}
                  {userInfo?.user?.userInfo?.email &&
                    userInfo?.user?.userInfo?.email}
                </li>
                <li
                  className='tw-px-1 tw-py-1 tw-mt-1 tw-text-sm tw-uppercase tw-transition-all hover:tw-text-red-700'
                  onClick={handleLogout}
                >
                  <i className='fa-solid fa-right-from-bracket'></i> Logout
                </li>
              </ul>
            </li>
          )}
          <li className='tw-text-red-300 tw-px-2 tw-cursor-pointer'>
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

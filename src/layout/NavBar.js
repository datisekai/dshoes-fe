import React, { useEffect, useState } from "react";
import { Button, Offcanvas, Nav, OverlayTrigger } from "react-bootstrap";
import { BsList, BsHouseDoorFill, BsBoxArrowLeft } from "react-icons/bs";
import { Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import { url } from "../api/Admin/config";
import axios from "axios";
import { useSelector } from "react-redux";

function NavBar() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [route, setRoute] = useState([]);
  const role = useSelector((state) => state.user.user.roles);
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    window.location.href = "/";
    window.location.reload();
  };

  console.log(route);
  useEffect(() => {
    async function getRoute() {
      try {
        const res = await axios.get(`${url}/role_cate`);
        // console.log(res.data.role_cate);
        setRoute(res.data.role_cate);
      } catch (err) {
        console.log(err);
      }
    }
    getRoute();
  }, []);

  console.log(route);

  return (
    <div className='d-flex flex-row shadow background'>
      <div className='bg-light d-block d-sm-none d-md-none'>
        <Button variant='primary' onClick={handleShow}>
          <BsList />
        </Button>
      </div>
      {/**Mobile */}
      <Offcanvas show={show} onHide={handleClose} className='sidebar'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Admin DashBoard</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className='flex-column'>
            <Link
              className='text-light text-decoration-none nav-item text-center nav-item mt-3 hvr-underline-from-center'
              to='/admin'
            >
              Home
            </Link>
            {/*<Link className='text-light text-decoration-none nav-item text-center nav-item mt-3' to='/product'><BsFillBasket3Fill /> Products</Link>
                        <Link className='text-light text-decoration-none nav-item text-center nav-item mt-3' to='/account'><BsPersonFill /> Account</Link>
                        <Link className='text-light text-decoration-none nav-item text-center nav-item mt-3' to='/orders'><BsCartFill /> Orders</Link>
                        <Link className='text-light text-decoration-none nav-item text-center nav-item mt-3' to='/statistic'><BsBarChartFill /> Statistics</Link>*/}
            {route.map((item, index) => {
              if (role.includes(item.roleId))
                return (
                  <Link
                    className='text-light text-decoration-none nav-item text-center nav-item mt-3 hvr-underline-from-center'
                    to={`/admin/${item.route.slice(1)}`}
                    key={index}
                  >
                    {item.category_name}
                  </Link>
                );

              return null;
            })}
          </Nav>
          <Button
            variant='danger'
            onClick={handleLogout}
            className='position-absolute bottom-0 start-50 translate-middle-x w-100'
          >
            <BsBoxArrowLeft />
          </Button>
        </Offcanvas.Body>
      </Offcanvas>
      {/**Desktop */}
      <Offcanvas
        show={true}
        className='bg-secondary d-none d-sm-block d-md-block sidebar'
        name='Enable body scrolling'
        scroll={true}
        backdrop={false}
      >
        <Offcanvas.Body>
          <div className='d-flex flex-column flex-shrink-0'>
            <Nav className='flex-column'>
              <OverlayTrigger
                placement='right'
                overlay={<Tooltip id='button-tooltip'>Home</Tooltip>}
              >
                <Link
                  className='text-light nav-item text-center text-center fs-3 btn hvr-underline-from-center'
                  to='/admin'
                >
                  <BsHouseDoorFill />
                </Link>
              </OverlayTrigger>
              {/*<OverlayTrigger placement='right'
                                overlay={<Tooltip id="button-tooltip">Products</Tooltip>}>
                                <Link className='text-light nav-item text-center text-center fs-3 btn hvr-underline-from-center' to='/product'><BsFillBasket3Fill /></Link>
                            </OverlayTrigger>
                            <OverlayTrigger placement='right'
                                overlay={<Tooltip id="button-tooltip">Account</Tooltip>}>
                                <Link className='text-light nav-item text-center text-center fs-3 btn hvr-underline-from-center' to='/account'><BsPersonFill /></Link>
                            </OverlayTrigger>
                            <OverlayTrigger placement='right'
                                overlay={<Tooltip id="button-tooltip">Orders</Tooltip>}>
                                <Link className='text-light nav-item text-center text-center fs-3 btn hvr-underline-from-center' to='/orders'><BsCartFill /></Link>
                            </OverlayTrigger>
                            <OverlayTrigger placement='right'
                                overlay={<Tooltip id="button-tooltip">Statistics</Tooltip>}>
                                <Link className='text-light nav-item text-center text-center fs-3 btn hvr-underline-from-center' to='/statistic'><BsBarChartFill /></Link>
                            </OverlayTrigger>*/}
              {route.map((item, index) => {
                if (role.includes(item.roleId))
                  return (
                    <Link
                      className='text-light text-decoration-none nav-item text-center nav-item mt-3 hvr-underline-from-center'
                      to={`/admin/${item.route.slice(1)}`}
                      key={index}
                    >
                      {item.category_name}
                    </Link>
                  );
                return null;
              })}
            </Nav>
            <Button
              variant='danger'
              onClick={handleLogout}
              className='position-absolute bottom-0 start-50 translate-middle-x w-100'
            >
              <BsBoxArrowLeft />
            </Button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
      {/*<div className='m-auto background'>
                <Dropdown className='position-absolute top-0 end-0'>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                        admin
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item>Your profile</Dropdown.Item>
                        <Dropdown.Item>Log out</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>*/}
    </div>
  );
}
export default NavBar;

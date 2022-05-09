import { useState, useEffect } from "react";
import { BsFileEarmarkTextFill } from "react-icons/bs";
import { Modal, Spinner, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { authURL } from "../../api/Admin/config";
import FormAddUser from "../../components/Admin/form/FormAddUser";
import FormAddRoute from "../../components/Admin/form/FormAddRoute";
import axios from "axios";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [dialogAdd, setDialogAdd] = useState(false);
  const [dialogRoute, setDialogRoute] = useState(false);
  const [user, setUser] = useState({});
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await axios.get(`${authURL}/user/`);
        // console.log(res.data);
        setUser(res.data.user);
      } catch (e) {
        toast.error("Failed to load data from server.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  const updateProfile = () => {
    setDialogAdd(true);
  };
  return (
    <div className='pt-5 pb-4 tab background'>
      <div className='bg-box mx-2 rounded text-light p-2'>
        <h3 className='ps-4'>Welcome back, admin !!!</h3>
        <hr />
        <ul>
          <BsFileEarmarkTextFill /> Your information:
          {loading ? (
            <li>
              loading <Spinner animation='grow' size='sm' />
            </li>
          ) : (
            <>
              <li>ID: {user._id}</li>
              <li>Emai: {user.email}</li>
              <li>Phone number: {user.phoneNumber}</li>
              <li>Create at: {user.createdAt?.slice(0, 10)}</li>
            </>
          )}
        </ul>
        <hr />
        <Button className='ms-4' onClick={() => setDialogRoute(true)}>
          Add new route
        </Button>
        <hr />
        <b
          className='text-info ps-4'
          style={{ cursor: "pointer" }}
          onClick={updateProfile}
        >
          <u>Update my profile</u>
        </b>
      </div>
      <Modal show={dialogAdd} onHide={() => setDialogAdd(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Your id: {user._id}</p>
          <FormAddUser
            user={user}
            type='update'
            cancel={() => setDialogAdd(false)}
          />
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
      <Modal show={dialogRoute} onHide={() => setDialogRoute(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add new route</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormAddRoute cancel={() => setDialogRoute(false)} />
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
}

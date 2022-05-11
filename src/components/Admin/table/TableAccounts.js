import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import {
  Table,
  Spinner,
  Dropdown,
  Button,
  Modal,
  Badge,
} from "react-bootstrap";
import {
  BsFillPencilFill,
  BsFillTrashFill,
  BsArrowClockwise,
  BsTools,
} from "react-icons/bs";
import { toast } from "react-toastify";
import { authURL } from "../../../api/Admin/config";
import FormAddUser from "../form/FormAddUser";
import FormSetRole from "../form/FormSetRole";
//redux store
import { useDispatch } from "react-redux";
import {
  setLoading as setLoadingData,
  setTotal as setTotalData,
} from "../../../app/accountReducer";

export default function TableAccount(props) {
  const [accounts, setAccounts] = useState([]);
  const [account, setAccount] = useState({});
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [dialogDelete, setDialogDelete] = useState(false);
  const [dialogEdit, setDialogEdit] = useState(false);
  const [dialogSetRole, setDialogSetRole] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [idAccount, setIdAccount] = useState("");
  const [total, setTotal] = useState(0);
  const [reload, setReload] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await axios.get(`${authURL}/users`);
        console.log(response.data);
        setAccounts(response.data.users);
        setTotal(response.data.total);
        dispatch(setLoadingData(true));
        dispatch(setTotalData(response.data.total));
      } catch (e) {
        toast.error(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [dispatch]);
  const openModal = (modalType, account) => {
    switch (modalType) {
      case "edit":
        setAccount(account);
        setDialogEdit(true);
        break;
      case "delete":
        setIdAccount(account._id);
        setDialogDelete(true);
        break;
      case "setRole":
        setIdAccount(account._id);
        setDialogSetRole(true);
        break;
      default:
        return;
    }
  };
  const resetPage = useCallback(async () => {
    if (page < 1) {
      setPage(1);
      return;
    }
    try {
      setLoading(true);
      const response = await axios.get(`${authURL}/users?page=${page}`);
      setAccounts(response.data.users);
      // if(accounts.length===0){
      //     toast.info("No more data.");
      // }
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  }, [page]);
  const handleDeletAccount = async () => {
    try {
      setDisabled(true);
      await axios.delete(`${authURL}/user/${idAccount}`);
      toast.success("This account has been banned");
      resetPage();
    } catch (e) {
      toast.error(e.message);
    } finally {
      setDisabled(false);
      setDialogDelete(false);
    }
  };
  useEffect(() => {
    resetPage();
  }, [page, resetPage]);
  useEffect(() => {
    if (reload || props.reload) {
      resetPage();
      setReload(false);
    }
  }, [reload, resetPage, props.reload]);
  return (
    <>
      <div className="mx-2">
        <b
          className='text-light'
          style={{ cursor: "pointer" }}
          onClick={() => resetPage(page)}
        >
          Reload <BsArrowClockwise />
        </b>
      </div>
      <Table className='text-light text-center' responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Create at</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan='7'>
                <div className='text-center'>
                  <Spinner animation='grow' size='sm' /> loading ...
                </div>
              </td>
            </tr>
          ) : (
            accounts?.map((account, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{account.email}</td>
                <td>{account.phoneNumber}</td>
                <td>{account.createdAt.slice(0, 10)}</td>
                <td>
                  {account.display ? (
                    <Badge bg='success'>Active</Badge>
                  ) : (
                    <Badge bg='danger'>Inactive</Badge>
                  )}
                </td>
                <td>
                  <Dropdown>
                    <Dropdown.Toggle
                      className='rounded-circle'
                      variant='primary'
                    ></Dropdown.Toggle>
                    <Dropdown.Menu className='text-center bg-secondary'>
                      <Button
                        variant='success'
                        style={{ backgroundColor: "#65a30d" }}
                        className='mx-1'
                        onClick={() => openModal("edit", account)}
                      >
                        <BsFillPencilFill />
                      </Button>
                      <Button
                        variant='warning'
                        className='mx-1'
                        onClick={() => openModal("setRole", account)}
                      >
                        <BsTools />
                      </Button>
                      <Button
                        variant='danger'
                        className='mx-1'
                        onClick={() => openModal("delete", account)}
                      >
                        <BsFillTrashFill />
                      </Button>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      <div
        className='d-flex flex-row justify-content-center text-primary'
        style={{ cursor: "pointer" }}
      >
        {page === 1 ? (
          <></>
        ) : (
          <u className='mx-2' onClick={() => setPage(page - 1)}>
            Previous
          </u>
        )}
        <p className='mx-2'> page {page} </p>
        {page === Math.ceil(total / 8) ? (
          <></>
        ) : (
          <u className='mx-2' onClick={() => setPage(page + 1)}>
            Next
          </u>
        )}
      </div>
      <Modal
        show={dialogDelete}
        onHide={() => setDialogDelete(false)}
        size='md'
        centered
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-center'>Ban this account?</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setDialogDelete(false)}>
            No
          </Button>
          <Button
            variant='primary'
            disabled={disabled}
            onClick={handleDeletAccount}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={dialogEdit}
        onHide={() => setDialogEdit(false)}
        size='md'
        centered
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title>Update account</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-center'>
          <p>Id user: {account._id}</p>
          <FormAddUser
            user={account}
            type='update'
            cancel={() => setDialogEdit(false)}
            reload={(data) => setReload(data)}
          />
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
      <Modal
        show={dialogSetRole}
        onHide={() => setDialogSetRole(false)}
        size='md'
        centered
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title>Set role</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-center'>
          <FormSetRole
            id={idAccount}
            cancel={() => setDialogSetRole(false)}
            reload={(data) => setReload(data)}
          />
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}

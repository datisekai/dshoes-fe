import { useEffect, useState, useCallback } from "react";
import {
  Badge,
  Table,
  Button,
  Dropdown,
  Modal,
  Spinner,
  Form,
} from "react-bootstrap";
import { productURL } from "../../../api/Admin/config";
import {
  BsFillPencilFill,
  BsFillTrashFill,
  BsArrowClockwise,
} from "react-icons/bs";
import { toast } from "react-toastify";
import FormEditProduct from "../form/FormEditProduct";
import { useDispatch } from "react-redux";
import {
  setTotal as setTotalData,
  setLoading as setLoadingData,
} from "../../../app/productReducer";
import SelectBoxAction from "../action/selectBoxAction";
import ProductsAction from "../action/productActions";
import formatMoney from "../formatMoney";
import axios from "axios";

const sortData = [
  {
    key: "default",
    value: "Sort by",
  },
  {
    key: "sortByName",
    value: "Name",
  },
  {
    key: "sortByPrice",
    value: "Price",
  },
];
const filterData = [
  {
    key: "default",
    value: "Filter by",
  },
  {
    key: "all",
    value: "All",
  },
  {
    key: 1,
    value: "Available",
  },
  {
    key: 0,
    value: "Unavailable",
  },
];

export default function TableProduct(props) {
  const [products, setProducts] = useState([]);
  const [defaultProducts, setDefaultProducts] = useState([]);
  const [dialogDelete, setDialogDelete] = useState(false);
  const [dialogEdit, setDialogEdit] = useState(false);
  const [idProduct, setIdProduct] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [total, setTotal] = useState(1);
  const [page, setPage] = useState(1);
  const [reload, setReload] = useState(props.reload || false);
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(`${productURL}`);
        const data = await response.json();
        // console.log(data);
        setProducts(data.products);
        setDefaultProducts(data.products);
        setTotal(data.total);
        dispatch(setLoadingData(true));
        const res = await axios.get(`${productURL}/types/all`);
        const types = res.data.types.filter(value => value.display === true);
        types.forEach(element => {
          filterData.push({
            key: 'types:' + element.type,
            value: element.type.charAt(0).toUpperCase() + element.type.slice(1),
          });
        });
      } catch (e) {
        toast.error("Failed to load data from server.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [dispatch]);
  const handleEditDialog = (id) => {
    setIdProduct(id);
    setDialogEdit(true);
  };
  const handleDeleteDialog = (id) => {
    setIdProduct(id);
    setDialogDelete(true);
  };
  const handleDelete = async () => {
    try {
      setDisabled(true);
      await axios.delete(`${productURL}/${idProduct}`);
      toast.success("Delete product successfully.");
      setReload(true);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setDisabled(false);
      setDialogDelete(false);
    }
  };
  const resetPage = useCallback(async () => {
    const totalPage = Math.ceil(total / 8);
    if (page < 1) {
      setPage(1);
      return;
    }
    if (page > totalPage) {
      setPage(totalPage);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${productURL}?page=${page}`);
      const data = await response.json();
      setProducts(data.products);
      setDefaultProducts(data.products);
      setTotal(data.total);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  }, [page, total]);
  useEffect(() => {
    dispatch(setTotalData(total));
  }, [total, dispatch]);
  useEffect(() => {
    resetPage();
  }, [page, resetPage]);
  useEffect(() => {
    if (reload || props.reload) {
      setReload(false);
      resetPage();
    }
  }, [reload, resetPage, props.reload]);
  const handleSelectChange = (data) => {
    if (data.includes('types:')) {
      const valueFilter = data.split(':')[1];
      setProducts([
        ...ProductsAction(defaultProducts, "filterByType", valueFilter),
      ]);
    } else setProducts([...ProductsAction(defaultProducts, data)]);
  };
  return (
    <>
      <div className='d-flex flex-row'>
        <div className='mx-2'>
          <b
            className='text-light'
            style={{ cursor: "pointer" }}
            onClick={() => resetPage(page)}
          >
            Reload <BsArrowClockwise />
          </b>
        </div>
        <div className='ms-auto d-flex flex-row'>
          <SelectBoxAction
            data={filterData}
            select_change={(data) => handleSelectChange(data)}
          />
          <SelectBoxAction
            data={sortData}
            select_change={(data) => handleSelectChange(data)}
          />
        </div>
      </div>
      <Table className='text-light text-center' responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Type</th>
            <th>Status</th>
            <th>Create at</th>
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
            products?.map((product, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>{formatMoney(product.prices)}</td>
                <td>{product.typeId?.type}</td>
                <td>
                  {product.status ? (
                    <Badge bg='success'>Available</Badge>
                  ) : (
                    <Badge bg='danger'>Unavailable</Badge>
                  )}
                </td>
                <td>{product.createdAt.slice(0, 10)}</td>
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
                        onClick={() => handleEditDialog(product._id)}
                      >
                        <BsFillPencilFill />
                      </Button>
                      <Button
                        variant='danger'
                        className='mx-1'
                        onClick={() => handleDeleteDialog(product._id)}
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
      {/* Modal DELETE */}
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
        <Modal.Body className='text-center'>
          Are you sure? Data after delete can not be restore.
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setDialogDelete(false)}>
            No
          </Button>
          <Button variant='primary' disabled={disabled} onClick={handleDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Modal EDIT */}
      <Modal
        show={dialogEdit}
        onHide={() => setDialogEdit(false)}
        size='lg'
        centered
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit product</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-center'>
          <FormEditProduct
            id={idProduct}
            cancel={(data) => setDialogEdit(data)}
            reload={(data) => setReload(data)}
          />
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}

import { useState, useEffect } from "react";
import { BsPeopleFill, BsFillArchiveFill, BsFillBagFill } from "react-icons/bs";
import { Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  setTotal as setTotalDataP,
  setLoading as setLoadingDataP,
} from "../../app/productReducer";
import {
  setTotal as setTotalDataO,
  setLoading as setLoadingDataO,
} from "../../app/orderReducer";
import {
  setTotal as setTotalDataA,
  setLoading as setLoadingDataA,
} from "../../app/accountReducer";
import axios from "axios";
import { toast } from "react-toastify";
//api
import { productURL, authURL, orderURL } from "../../api/Admin/config";

export default function GeneralInfor() {
  const loadingProducts = useSelector(
    ((state) => state.products?.loading) || false
  );
  const loadingAccounts = useSelector(
    ((state) => state.accounts?.loading) || false
  );
  const loadingOrders = useSelector(
    ((state) => state.orders?.loading) || false
  );
  const [totalProducts, setTotalProducts] = useState(
    useSelector(((state) => state.products?.total) || 0)
  );
  const [totalAccounts, setTotalAccounts] = useState(
    useSelector(((state) => state.accounts?.total) || 0)
  );
  const [totalOrders, setTotalOrders] = useState(
    useSelector(((state) => state.orders?.total) || 0)
  );
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        //check data in redux store
        if (!loadingProducts) {
          const res1 = await fetch(`${productURL}`);
          const data = await res1.json();
          setTotalProducts(data.total);
          dispatch(setTotalDataP(data.total), setLoadingDataP(true));
        }
        if (!loadingAccounts) {
          const res2 = await axios.get(`${authURL}/users`);
          setTotalAccounts(res2.data.total);
          dispatch(setTotalDataA(res2.data.total), setLoadingDataA(true));
        }
        if (!loadingOrders) {
          const res3 = await axios.get(`${orderURL}/admin/all`);
          setTotalOrders(res3.data.total);
          dispatch(setTotalDataO(res3.data.total), setLoadingDataO(true));
        }
        // const statistics = await axios.get(`${url}/statistic`);
        // console.log(statistics.data);
      } catch (e) {
        toast.error("Failed to load data from server.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [dispatch, loadingProducts, loadingAccounts, loadingOrders]);
  return (
    <div className='d-flex flex-wrap'>
      <div className='mx-2 text-center p-3 rounded inforBox bg-box mt-1 flex-fill'>
        <h4 className='text-light'>
          <BsFillArchiveFill /> Total products
        </h4>
        <hr className='text-light'></hr>
        <h3 className='text-info'>
          {loading ? (
            <Spinner animation='grow' variant='info' />
          ) : (
            totalProducts
          )}
        </h3>
      </div>
      <div className='mx-2 text-center p-3 rounded inforBox bg-box mt-1 flex-fill'>
        <h4 className='text-light'>
          <BsFillBagFill /> Total orders
        </h4>
        <hr className='text-light'></hr>
        <h3 className='text-info'>
          {loading ? <Spinner animation='grow' variant='info' /> : totalOrders}
        </h3>
      </div>
      <div className='mx-2 text-center p-3 rounded inforBox bg-box mt-1 flex-fill'>
        <h4 className='text-light'>
          <BsPeopleFill /> Total accounts
        </h4>
        <hr className='text-light'></hr>
        <h3 className='text-info'>
          {loading ? (
            <Spinner animation='grow' variant='info' />
          ) : (
            totalAccounts
          )}
        </h3>
      </div>
    </div>
  );
}

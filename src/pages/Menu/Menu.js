import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { base_products } from "../../api/config";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { setProduct } from "../../redux/productReducer";
import { setFlag, setText } from "../../redux/searchReducer";
import { setType } from "../../redux/typeReducer";
import ShoesList from "./ShoesList";

const Menu = () => {
  const { type } = useParams();
  const types = useSelector((state) => state.type.type);
  const [page, setPage] = useState(1);
  const products = useSelector((state) => state.product.products);
  const [limit, setLimit] = useState(8);
  const [skip, setSkip] = useState(1);
  const [total, setTotal] = useState(0);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const [to, setTo] = useState();
  const [from, setFrom] = useState();
  const [kind, setKind] = useState();
  const text = useSelector((state) => state.search.text);
  const [max, setMax] = useState(10000000);

  useEffect(() => {
    getTypes();
    getMax()
  }, []);

  useEffect(() => {
    if (type !== "results") {
      dispatch(setFlag(false));
    }
  }, [type]);

  const getTypes = async () => {
    try {
      const res = await axios.get(`${base_products}/types/all`);
      dispatch(setType(res.data.types));
    } catch (err) {
      err.response && toast(err.response.message);
    }
  };

  const getMax = async () => {
    try {
      const res = await axios.get(`${base_products}/max`);
      setMax(res.data.max);
    } catch (err) {
      err.response && toast(err.response.message);
    }
  };
  const handleSetTo = (to) => {
    setTo(to);
  };

  const handleSetFrom = (from) => {
    setFrom(from);
  };

  const handleSetKind = (kind) => {
    setKind(kind);
  };

  useEffect(() => {
    getProductsByType(searchParams.get("id"));
  }, [page]);

  useEffect(() => {
    setPage(1);
    if (type !== "results") {
      getProductsByType(searchParams.get("id"));
    }
  }, [type]);

  const getProductsByType = async (id) => {
    setLoad(true);
    dispatch(setProduct());
    try {
      let res;
      if (type && type !== "results") {
        res = await axios.get(
          `${base_products}/type/${id}?limit=${limit}&page=${page}`
        );
      } else {
        res = await axios.get(`${base_products}?limit=${limit}&page=${page}`);
      }
      dispatch(setProduct(res.data.products));
      setTotal(res.data.total);
      setSkip((page - 1) * limit + 1);
    } catch (err) {
      err.response && toast.error(err.response.message);
    }
    setLoad(false);
  };

  const handleNext = () => {
    const totalPage = Math.ceil(total / limit);
    if (page < totalPage) {
      setPage(page + 1);
    }
  };

  const handlePre = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleApply = async (e) => {
    e.preventDefault();
    dispatch(setFlag(true));
    navigate("/products/results");
    setLoad(true);
    try {
      const res = await axios.post(
        `${base_products}/search?limit=${limit}&page=${page}`,
        { to, from, kind, text }
      );
      dispatch(setProduct(res.data.results));
      setTotal(res.data.total);
      setSkip((page - 1) * limit + 1);
      setLoad(false);
      console.log(res);
    } catch (err) {}
  };

  return (
    <>
      <Header />
      <ShoesList
        type={type}
        list={products && products}
        pagination={
          total && { skip, limit, page, total, to: products && products.length }
        }
        handle={{
          handleNext,
          handlePre,
          handleApply,
          handleSetTo,
          handleSetFrom,
          handleSetKind,
        }}
        loading={load}
        types={types}
        max={max}
      />

      <Footer />
    </>
  );
};

export default Menu;

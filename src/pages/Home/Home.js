import React, { useEffect, useState } from "react";
import ContentHome from "../../components/ContentHome/ContentHome";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setType } from "../../redux/typeReducer";
import { toast } from "react-toastify";

const Home = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getTypes()
  },[])

  const getTypes = async () => {
    try {
      const res = await axios.get(
        "https://dshoes-server-production.up.railway.app/api/products/types/all"
      );
      dispatch(setType(res.data.types));
    } catch (err) {
      err.response && toast(err.response.message);
    }
  };
  return (
    <>
      <Header />
      <ContentHome />
      <Footer />
    </>
  );
};

export default Home;

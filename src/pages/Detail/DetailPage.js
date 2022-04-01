import axios from "axios";
import React, { useEffect, useState } from "react";
import { BarWave, Messaging } from "react-cssfx-loading/lib";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import swal from "sweetalert";
import { base_products } from "../../api/config";
import Back from "../../components/Back/Back";
import Shoes from "../../components/ContentHome/Shoes";
import DesDetail from "../../components/Detail/DesDetail";
import ImageDetail from "../../components/Detail/ImageDetail";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import "../../index.css";
import { addToCart } from "../../redux/cartReducer";
import { setLocal } from "../../utils/local";
import { scrollTop } from "../../utils/ScrollTop";
import Title from "../../utils/Title";

const DetailPage = () => {  
  const { id } = useParams();
  const [shoes, setShoes] = useState();
  const [load, setLoad] = useState(false);
  const [same, setSame] = useState();
  const [loadSame, setLoadSame] = useState(false);
  const carts = useSelector((state) => state.cart.carts);
  const userInfo = useSelector((state) => state.user);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    scrollTop();
  }, [id]);

  useEffect(() => {
    shoes && setLocal(shoes);
  }, [id, shoes]);

  useEffect(() => {
    getDetail();
  }, [id]);

  const getDetail = async () => {
    try {
      setLoad(true);
      const res = await axios.get(`${base_products}/${id}`);
      setShoes(res.data);
    } catch (err) {
      err.response && toast.error(err.response.message);
    }
    setLoad(false);
  };

  useEffect(() => {
    shoes && getSameProduct(shoes.product.typeId._id);
  }, [id, shoes]);

  const getSameProduct = async (type) => {
    try {
      setLoadSame(true);
      const res = await axios.get(`${base_products}/type/${type}`);
      setSame(res.data.products);
    } catch (err) {
      err.response.message && toast.error(err.response.message);
    }
    setLoadSame(false);
  };

  const handleAddToCart = (product) => {
    if (userInfo && userInfo.user) {
      if (!product.color || !product.size) {
        toast.error("Please check size or color!");
      } else {
        swal({
          title: "Are you sure?",
          icon: "info",
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            dispatch(addToCart(product));
            toast.success("Add to cart successfull !");
          }
        });
      }
    } else {
      product.productId
        ? navigate(`/login?productId=${product.productId}`)
        : navigate("/login");
    }
  };



  return (
    <>
      <Title Title={shoes && shoes.success && shoes.product.name} />
      <Header />
      <div className="min-h-screen bg-[#222222] relative">
        <Back />
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between pt-2 p-8">
          <ImageDetail image={shoes && shoes.success && shoes.product.image} />
          <DesDetail
            handleAddToCart={handleAddToCart}
            desc={shoes && shoes.success && shoes}
          />
        </div>
        {loadSame ? (
          <div className="flex justify-center items-center pb-10">
            <Messaging
              color="#007BFF"
              width="12px"
              height="12px"
              duration="1s"
            />
          </div>
        ) : (
          <Shoes type={"Same products"} list={same && same} />
        )}
        {load && (
          <div className="fixed bottom-0 top-0 left-0 right-0 flex justify-center items-center overlay">
            <BarWave color="#007BFF" duration="2s" />
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default DetailPage;

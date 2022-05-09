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
import useGet from "../../customHook/useGet";
import "../../index.css";
import { addToCart } from "../../redux/cartReducer";
import { setLocal } from "../../utils/local";
import { scrollTop } from "../../utils/ScrollTop";
import Title from "../../utils/Title";
import Loading from "../../components/Loading/Loading";

const DetailPage = () => {
  const { id } = useParams();
  const [shoes, setShoes] = useState();
  const [load, setLoad] = useState(false);
  const [same, setSame] = useState();
  const [loadSame, setLoadSame] = useState(false);
  const url = `${base_products}/${id}`;
  const { data, loading, error } = useGet(url);

  const dispatch = useDispatch();

  useEffect(() => {
    scrollTop();
  }, [id]);

  useEffect(() => {
    shoes && setLocal(shoes);
  }, [id, shoes]);

  useEffect(() => {
    setShoes(data);
  }, [data]);

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
  };

  return (
    <>
      <Title Title={shoes && shoes.success && shoes.product.name} />
      <Header />
      <div className='tw-min-h-screen tw-bg-[#222222] tw-relative'>
        <Back />
        <div className='tw-max-w-[1200px] tw-mx-auto tw-flex tw-flex-col md:tw-flex-row tw-justify-between tw-pt-2 tw-p-8'>
          <ImageDetail image={shoes && shoes.success && shoes.product.image} />
          <DesDetail
            handleAddToCart={handleAddToCart}
            desc={shoes && shoes.success && shoes}
          />
        </div>
        {loadSame ? (
          <div className='tw-flex tw-justify-center tw-items-center tw-pb-10'>
            <Messaging
              color='#007BFF'
              width='12px'
              height='12px'
              duration='1s'
            />
          </div>
        ) : (
          <Shoes type={"Same products"} list={same && same} />
        )}
        {loading && (
          // <div className="fixed bottom-0 top-0 left-0 right-0 flex justify-center items-center overlay">
          //   <BarWave color="#007BFF" duration="2s" />
          // </div>
          <Loading />
        )}
      </div>
      <Footer />
    </>
  );
};

export default DetailPage;

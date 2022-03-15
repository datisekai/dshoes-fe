import React, { useEffect, useState } from "react";
import Shoes from "../../components/ContentHome/Shoes";
import DesDetail from "../../components/Detail/DesDetail";
import ImageDetail from "../../components/Detail/ImageDetail";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { scrollTop } from "../../utils/ScrollTop";
import uuid from "react-uuid";
import Back from "../../components/Back/Back";
import { useParams } from "react-router-dom";
import { base_products } from "../../api/config";
import axios from "axios";
import Title from "../../utils/Title";
import { toast } from "react-toastify";
import { BarWave, Messaging } from "react-cssfx-loading/lib";
import "../../index.css";
import { setLocal } from "../../utils/local";

const DetailPage = () => {
  const { id } = useParams();
  const [shoes, setShoes] = useState();
  const [load, setLoad] = useState(false);
  const [same, setSame] = useState();
  const [loadSame, setLoadSame] = useState(false);

  const nikes = [
    {
      id: uuid(),
      img: "https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.3/w_467,c_limit/59873d2e-3816-402a-a666-bf3fa58ff41a/air-max-2021-shoes-P00HsV.png",
      name: "COURT LEGACY WHITE SUNSET PULSE [DA5380-103]",
    },
    {
      id: uuid(),
      img: "https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.3/w_467,c_limit/7c0a129e-0ff1-4cc1-b09d-0f6cfe38b8cf/air-max-furyosa-shoes-H9mN4q.png",
      name: "ROSHE TWO BLACK [844931-002]",
    },
    {
      id: uuid(),
      img: "https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.3/w_467,c_limit/80b8277d-ede8-4885-9c37-2fe1cdf341aa/air-max-90-shoes-K0mczj.png",
      name: "LUNARCHARGE ESSENTIAL [923619-304]",
    },
    {
      id: uuid(),
      img: "https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.3/w_467,c_limit/d8a4fead-8f49-44a6-ae63-1ffeb86ac68b/air-max-pre-day-shoes-jMh2rB.png",
      name: "AIR PRESTO ULTRA BRIGHT CRIMSON [835738-800]",
    },
    {
      id: uuid(),
      img: "https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.3/w_467,c_limit/6bc1782f-fc28-418a-b2ea-bd4c9af9d317/air-max-dawn-shoe-gq9GGH.png",
      name: "RUNNING REACT ELEMENT 87 [AQ1090-002]",
    },
    {
      id: uuid(),
      img: "https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.3/w_467,c_limit/ac7cd6a1-ff4c-412a-a572-f78e55b45aba/air-max-2021-older-shoes-dRthcp.png",
      name: "RUNNING REACT ELEMENT 87 [AQ1090-002]",
    },
    {
      id: uuid(),
      img: "https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.3/w_467,c_limit/906ce97a-42cd-4cc2-ae0e-4b1b4d8aecfe/air-max-dawn-shoes-LVntLp.png",
      name: "RUNNING REACT ELEMENT 87 [AQ1090-002]",
    },
    {
      id: uuid(),
      img: "https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.3/w_467,c_limit/344d3571-7354-45c9-9317-4306a6d086d8/air-max-sc-shoe-FVn5sK.png",
      name: "RUNNING REACT ELEMENT 87 [AQ1090-002]",
    },
  ];

  useEffect(() => {
    scrollTop();
  }, [id]);

  useEffect(() => {
    shoes && setLocal(shoes);
  },[id,shoes])

  useEffect(() => {
    getDetail();
  }, [id]);

  const getDetail = async () => {
    try {
      setLoad(true);
      const res = await axios.get(`${base_products}/${id}`);
      setShoes(res.data);
    } catch (err) {
      err.response.message && toast.error(err.response.message);
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

  return (
    <>
      <Title Title={shoes && shoes.success && shoes.product.name} />
      <Header />
      <div className="min-h-screen bg-[#222222] relative">
        <Back />
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between pt-2 p-8">
          <ImageDetail image={shoes && shoes.success && shoes.product.image} />
          <DesDetail desc={shoes && shoes.success && shoes} />
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

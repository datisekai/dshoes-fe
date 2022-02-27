import React, { useEffect } from "react";
import Shoes from "../../components/ContentHome/Shoes";
import DesDetail from "../../components/Detail/DesDetail";
import ImageDetail from "../../components/Detail/ImageDetail";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { scrollTop } from "../../utils/ScrollTop";
import uuid from 'react-uuid'
import Back from "../../components/Back/Back";

const DetailPage = () => {
  useEffect(() => {
    scrollTop();
  }, []);

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

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#222222] relative">
        <Back/>
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between pt-2 p-8">
          <ImageDetail />
          <DesDetail />
        </div>
        <Shoes type={"Same products"} list={nikes} />
      </div>
      <Footer />
    </>
  );
};

export default DetailPage;

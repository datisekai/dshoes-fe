import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Navigation,
  Autoplay,
  Pagination,
  EffectCoverflow,
} from "swiper";
import { Link } from "react-router-dom";
import uuid from "react-uuid";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Shoes from "./Shoes";

const ContentHome = () => {
  SwiperCore.use([Navigation, Autoplay, Pagination, EffectCoverflow]);

  const slides = [
    "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=812&q=80",
    "https://images.unsplash.com/photo-1590135558618-13ebf33841c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    "https://media.istockphoto.com/photos/fashionable-snakeskin-leather-sneakers-black-sneakers-with-bright-red-picture-id1253612860?k=20&m=1253612860&s=170667a&w=0&h=acZ64dtfmENfyLkohjkXliVk4_7FR0K_sfcono6n7p8=",
  ];
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

  const jordans = [
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
    <div className="min-h-[100vh] bg-[#222222] relative">
      <div className="max-w-[1200px] py-5 mx-auto">
        <Swiper
          pagination
          grabCursor={true}
          spaceBetween={0}
          slidesPerView={1}
          autoplay
          effect="coverflow"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div
                className="w-[100%] h-[200px] sm:h-[220px] md:h-[250px] lg:h-[300px] rounded-md relative bg-no-repeat bg-cover"
                style={{ backgroundImage: `url(${slide})` }}
              ></div>
              <h1 className="absolute bottom-0 px-5 py-3 text-lg text-gray-500">
                Name Shoes is here
              </h1>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <Shoes type="NIKE" list={nikes} />
      <Shoes type="JORDAN" list={jordans} />
    </div>
  );
};

export default ContentHome;

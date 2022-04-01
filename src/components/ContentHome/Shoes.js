import React from "react";
import SwiperCore, {
  Navigation,
  Autoplay,
  Pagination,
  EffectCoverflow,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "../../assets/css/index.css";
import "swiper/css";
import "swiper/css/navigation";
import useWidth from "../../customHook/useWidth";
import { Link } from "react-router-dom";
import Shoe from "./Shoe";

const Shoes = ({ type, list }) => {
  SwiperCore.use([Navigation, Autoplay, Pagination, EffectCoverflow]);
  const width = useWidth();
  let slide;
  let space;

  if (width >= 1024) {
    slide = 3.5;
    space = 30;
  } else if (width >= 768 && width < 1024) {
    slide = 3;
    space = 20;
  } else if (width >= 400 && width < 768) {
    slide = 2.5;
    space = 15;
  } else {
    space = 10;
    slide = 1.5;
  }
  return (
    <>
      {" "}
      {list && list.length > 0 && (
        <div className="max-w-[1200px] mx-auto py-[30px] px-[12px]">
          <h1 className="underlined-blue text-gray-200 text-2xl uppercase">
            {type}
          </h1>
          <div className="mt-6">
            <Swiper
              navigation
              grabCursor={true}
              spaceBetween={space}
              slidesPerView={slide}
              autoplay
            >
              {list &&
                list.length > 0 &&
                list?.map((item, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <Shoe product={item} />
                    </SwiperSlide>
                  );
                })}
            </Swiper>
          </div>
        </div>
      )}
    </>
  );
};

export default Shoes;

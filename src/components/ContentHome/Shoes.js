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
          {list && list.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <Link to={`/detail/${item._id}`}>
                  <div
                    className="w-[100%] h-[250px] md:h-[300px] rounded-md relative bg-no-repeat bg-cover aspect-video"
                    style={{ backgroundImage: `url(${item.image && item.image.length > 0 && item.image[0]})` }}
                  ></div>
                  <h1 className="absolute bottom-0 top-[25%] left-[25%] text-md md:text-xl text-red-500 uppercase">
                    {item.name}
                  </h1>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default Shoes;

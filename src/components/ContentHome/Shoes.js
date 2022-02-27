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
import useWidth from '../../customHook/useWidth'
import { Link } from "react-router-dom";

const Shoes = ({ type, list }) => {
  SwiperCore.use([Navigation, Autoplay, Pagination, EffectCoverflow]);
  const width = useWidth()

  let slide;

  if (width >= 1024) {
    slide = 3.5;
  } else if (width >= 768 && width < 1024) {
    slide = 3;
  } else if (width >= 400 && width < 768) {
    slide = 2.5;
  } else {
    slide = 1.5;
  }
  return (
    <div className="max-w-[1200px] mx-auto py-[30px] px-[12px]">
      <h1 className="underlined-blue text-gray-200 text-2xl">{type}</h1>
      <div className="mt-6">
        <Swiper
          navigation
          grabCursor={true}
          spaceBetween={0}
          slidesPerView={slide}
          autoplay
          effect="coverflow"
        >
          {list.map((item,index) => (
            <SwiperSlide key={index}>
              <Link to={`detail/${item.id}`}><div
                className="w-[100%] h-[250px] md:h-[300px] rounded-md relative bg-no-repeat bg-cover"
                style={{ backgroundImage: `url(${item.img})` }}
              ></div>
              <h1 className="absolute bottom-0 px-5 py-3 text-lg text-[#2A2A2A] shadow-sm">
                {item.name}
              </h1></Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Shoes;

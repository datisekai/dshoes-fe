import axios from "axios";
import React, { useEffect, useState } from "react";
import { FadingBalls } from "react-cssfx-loading";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import SwiperCore, {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { base_products } from "../../api/config";
import { getLocal } from "../../utils/local";
import Shoes from "./Shoes";

const ContentHome = () => {
  const [load, setLoad] = useState(false);
  const [recently, setRecently] = useState();
  useEffect(() => {
    setRecently(getLocal().map((item) => item.product));
  }, []);

  SwiperCore.use([Navigation, Autoplay, Pagination, EffectCoverflow]);

  const slides = [
    "https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/w_1423,c_limit/b9a782ae-7f59-48c6-ae98-bec7f77df8ec/nike-sportswear-nsw.png",
    "https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/w_1423,c_limit/aa8effa8-496a-4940-aa0b-22dea4ef0409/nike-sportswear-nsw.jpg",
    "https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/w_1423,c_limit/4ffc6a2c-d10a-4baa-abb0-59db155cf076/nikelab.jpg",
    "https://media.istockphoto.com/photos/fashionable-snakeskin-leather-sneakers-black-sneakers-with-bright-red-picture-id1253612860?k=20&m=1253612860&s=170667a&w=0&h=acZ64dtfmENfyLkohjkXliVk4_7FR0K_sfcono6n7p8=",
  ];

  const [products, setProducts] = useState();
  const { type } = useSelector((state) => state.type);

  useEffect(() => {
    getProductsByTypeId();
  }, [type]);

  const getProductsByTypeId = async () => {
    setLoad(true);
    try {
      const res = await axios.all(
        type.map((item) => axios.get(`${base_products}/type/${item._id}`))
      );
      setProducts(res.map((item) => item.data.products));
    } catch (err) {
      console.log(err);
      err.response && toast.error(err.response.data.message);
    }
    setLoad(false);
  };

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
                className="w-[100%] h-[200px] sm:h-[220px] md:h-[250px] lg:h-[400px] rounded-md relative bg-no-repeat bg-cover aspect-video"
                style={{ backgroundImage: `url(${slide})` }}
              ></div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {recently && recently.length > 0 && (
        <Shoes type="RECENTLY" list={recently} />
      )}
      {products &&
        products.length > 0 &&
        products.map((item, index) => (
          <Shoes key={index} type={type[index].type} list={item} />
        ))}
      {load && (
        <div className="p-5 flex justify-center items-center">
          <FadingBalls
            color="#FF0000"
            width="12px"
            height="12px"
            duration="2s"
          />
        </div>
      )}
    </div>
  );
};

export default ContentHome;

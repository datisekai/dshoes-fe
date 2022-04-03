import React, { useEffect, useRef } from "react";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import ImgLazy from "../../utils/ImgLazy";

const Shoe = ({ product }) => {
  return (
    <Link to={`/products/detail/${product._id}`} key={product._id}>
      <div className="relative">
        <ImgLazy
          lazy_src={product.image[0]}
          className="w-[266px] h-[220px] md:h-[266px] rounded-md relative"
        />

        <div className="absolute bottom-[20%] left-[20%] w-full">
          <NumberFormat
            className="bg-transparent text-blue-400 text-sm md:text-md lg:text-lg outline-none"
            thousandSeparator={true}
            suffix=" VND"
            displayType="text"
            value={product.prices}
          />
        </div>
        <h2 className="text-gray-100 truncate py-2">{product.name}</h2>
      </div>
    </Link>
  );
};

export default Shoe;

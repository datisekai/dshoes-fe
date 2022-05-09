import React, { useEffect, useRef } from "react";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import ImgLazy from "../../utils/ImgLazy";
import { to_slug } from "../../utils/toSlug";

const Shoe = ({ product }) => {
  return (
    <Link
      to={`/products/detail/${product._id}/${to_slug(product.name)}`}
      key={product._id}
    >
      <div className='tw-relative'>
        <ImgLazy
          lazy_src={product.image[0]}
          className='tw-w-[266px] tw-h-[220px] md:tw-h-[266px] tw-rounded-md tw-relative'
        />

        <div className='tw-absolute tw-bottom-[20%] tw-left-[20%] tw-w-full'>
          <NumberFormat
            className='tw-bg-transparent tw-text-blue-400 tw-text-sm md:tw-text-md lg:tw-text-lg tw-outline-none'
            thousandSeparator={true}
            suffix=' VND'
            displayType='text'
            value={product.prices}
          />
        </div>
        <h6 className='tw-text-gray-100 tw-truncate tw-py-2'>{product.name}</h6>
      </div>
    </Link>
  );
};

export default Shoe;

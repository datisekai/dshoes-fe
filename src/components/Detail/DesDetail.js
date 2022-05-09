import React, { useEffect, useState } from "react";
import "../../assets/css/index.css";
import ReviewDetail from "./ReviewDetail";
import NumberFormat from "react-number-format";

const DesDetail = ({ desc, handleAddToCart }) => {
  const [size, setSize] = useState(null);
  const [color, setColor] = useState(null);

  return (
    <div className='md:tw-w-[50%] lg:tw-w-[40%] tw-px-0 tw-py-5 md:tw-px-5'>
      <h6 className='tw-text-red-400'>Sustainable Materials</h6>
      <h1 className='underlined-blue tw-text-gray-100 tw-text-2xl tw-mt-2'>
        {desc && desc.product.name}
      </h1>
      <h6 className='tw-text-gray-100 tw-mt-2'>Women's Shoes</h6>
      <h6 className='tw-text-gray-100 tw-text-xl tw-mt-3'>
        {" "}
        <NumberFormat
          className='tw-bg-transparent tw-text-gray-100 tw-outline-none'
          thousandSeparator={true}
          suffix=' VND'
          displayType='text'
          value={desc && desc.product.prices}
        />
      </h6>
      <div className='tw-mt-3'>
        <h6 className='tw-text-gray-100'>Select Color</h6>
        <div className='tw-grid tw-grid-cols-2 md:tw-grid-cols-3 tw-gap-2 tw-mt-2'>
          {desc &&
            desc.color.map((item, index) => (
              <label
                key={index}
                htmlFor={`input-${item}`}
                className='tw-flex tw-items-center tw-justify-between tw-text-gray-100 tw-px-5 tw-py-1 tw-border tw-border-gray-100 tw-rounded-md hover:tw-opacity-75 tw-transition-all tw-cursor-pointer'
              >
                <input
                  type='checkbox'
                  name='inputSize'
                  id={`input-${item}`}
                  checked={item == color}
                  value={item}
                  onChange={(e) => setColor(e.target.value)}
                />
                <p className='tw-uppercase'>{item}</p>
              </label>
            ))}
        </div>
      </div>
      <div className='tw-mt-3'>
        <h6 className='tw-text-gray-100'>Select Size</h6>
        <div className='tw-grid tw-grid-cols-2 md:tw-grid-cols-3 tw-gap-2 tw-mt-2'>
          {desc &&
            desc.size.map((item, index) => (
              <label
                key={index}
                htmlFor={`input-${item}`}
                className='tw-flex tw-items-center tw-justify-between tw-text-gray-100 tw-px-5 tw-py-1 tw-border tw-border-gray-100 tw-rounded-md hover:tw-opacity-75 tw-transition-all tw-cursor-pointer'
              >
                <input
                  type='checkbox'
                  name='inputSize'
                  id={`input-${item}`}
                  checked={item == size}
                  value={item}
                  onChange={(e) => setSize(e.target.value)}
                />
                <p className='tw-uppercase'>VN {item}</p>
              </label>
            ))}
        </div>
      </div>
      <button
        onClick={() =>
          handleAddToCart({
            productId: desc.product._id,
            color,
            size,
            quantify: 1,
            image: desc.product.image[0],
            name: desc.product.name,
            prices: desc.product.prices,
            _id: `${desc.product._id}-${color}-${size}`,
          })
        }
        className='tw-w-full tw-mt-5 tw-px-4 tw-py-1 tw-rounded-lg tw-text-gray-100 hover:tw-opacity-90 tw-bg-gradient-to-r tw-from-blue-400 tw-to-red-400 tw-transition-all'
      >
        ADD TO BAG
      </button>
      <p className='tw-mt-3 tw-py-2 tw-text-[#ccc] tw-text-md'>
        {desc && desc.product.desc}
      </p>
      <ReviewDetail />
    </div>
  );
};

export default DesDetail;

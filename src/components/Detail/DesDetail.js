import React, { useEffect, useState } from "react";
import "../../assets/css/index.css";
import ReviewDetail from "./ReviewDetail";
import NumberFormat from "react-number-format";

const DesDetail = ({ desc, handleAddToCart }) => {
  const [size, setSize] = useState(null);
  const [color, setColor] = useState(null);

  return (
    <div className="md:w-[50%] lg:w-[40%] px-0 py-5 md:px-5">
      <h3 className="text-red-400">Sustainable Materials</h3>
      <h1 className="underlined-blue text-gray-100 text-2xl mt-2">
        {desc && desc.product.name}
      </h1>
      <h3 className="text-gray-100 mt-2">Women's Shoes</h3>
      <h2 className="text-gray-100 text-xl mt-3">
        {" "}
        <NumberFormat
          className="bg-transparent text-gray-100 outline-none"
          thousandSeparator={true}
          suffix=" VND"
          value={desc && desc.product.prices}
        />
      </h2>
      <div className="mt-3">
        <h3 className="text-gray-100">Select Color</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
          {desc &&
            desc.color.map((item, index) => (
              <label
                key={index}
                htmlFor={`input-${item}`}
                className="flex items-center justify-between text-gray-100 px-5 py-1 border border-gray-100 rounded-md hover:opacity-75 transition-all cursor-pointer"
              >
                <input
                  type="checkbox"
                  name="inputSize"
                  id={`input-${item}`}
                  checked={item == color}
                  value={item}
                  onChange={(e) => setColor(e.target.value)}
                />
                <p className="uppercase">{item}</p>
              </label>
            ))}
        </div>
      </div>
      <div className="mt-3">
        <h3 className="text-gray-100">Select Size</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
          {desc &&
            desc.size.map((item, index) => (
              <label
                key={index}
                htmlFor={`input-${item}`}
                className="flex items-center justify-between text-gray-100 px-5 py-1 border border-gray-100 rounded-md hover:opacity-75 transition-all cursor-pointer"
              >
                <input
                  type="checkbox"
                  name="inputSize"
                  id={`input-${item}`}
                  checked={item == size}
                  value={item}
                  onChange={(e) => setSize(e.target.value)}
                />
                <p className="uppercase">VN {item}</p>
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
          })
        }
        className="w-full mt-5 px-4 py-1 rounded-lg text-gray-100 hover:opacity-90 bg-gradient-to-r from-blue-400 to-red-400 transition-all"
      >
        ADD TO BAG
      </button>
      <p className="mt-3 py-2 text-[#ccc] text-md">
        {desc && desc.product.desc}
      </p>
      <ReviewDetail />
    </div>
  );
};

export default DesDetail;

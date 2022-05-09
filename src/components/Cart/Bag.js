import React, { useState } from "react";
import "../../assets/css/index.css";
import "boxicons";
import NumberFormat from "react-number-format";
import { Navigate, useNavigate } from "react-router-dom";
import { to_slug } from "../../utils/toSlug";

const Bag = ({ carts, handleAdd, handleMinus, handleDelete }) => {
  console.log(carts);
  const navigate = useNavigate();
  return (
    <div className='tw-w-full md:tw-w-[50%] lg:tw-w-[60%]'>
      <h1 className='tw-underlined-blue tw-uppercase tw-text-gray-100 tw-text-2xl'>
        Bag
      </h1>
      <div className='tw-mt-2'>
        {!carts ||
          (carts.length === 0 && (
            <img
              className='tw-object-cover tw-w-full tw-aspect-video tw-cursor-pointer'
              src='https://raw.githubusercontent.com/Ren0503/zenzen-js-share-video/master/client/src/assets/noresults.png'
            ></img>
          ))}
        {carts &&
          carts.map((item, index) => (
            <div
              key={index}
              className='tw-mt-3 tw-border-b tw-border-solid tw-border-[#ccc] tw-flex tw-justify-start tw-py-5'
            >
              <img
                className='tw-w-[150px] tw-h-[150px] tw-object-cover tw-rounded-md tw-w-[25%]'
                onClick={() =>
                  navigate(
                    `/products/detail/${item.productId}/${to_slug(item.name)}`
                  )
                }
                src={item.image}
              ></img>
              <div className='tw-px-5 tw-w-[45%]'>
                <h2 className='tw-text-gray-100 tw-text-md'>{item.name}</h2>
                <p className='tw-text-red-300 tw-text-sm'>Women's Shoes</p>
                <p className='tw-text-gray-200 tw-text-md'>
                  <span className='tw-capitalize'>{item.color}</span> Shoes
                </p>
                <p className='tw-text-gray-200 tw-text-md'>Size {item.size}</p>
                <div className='tw-flex'>
                  <div className='tw-flex tw-items-center'>
                    <label htmlFor='' className='tw-text-gray-200 tw-text-md'>
                      Quantify
                    </label>
                    <i
                      onClick={() => handleAdd(item)}
                      className=' tw-px-2 tw-py-1 tw-text-gray-200 hover:tw-text-gray-400 tw-transition-all tw-cursor-pointer fa-solid fa-plus'
                    ></i>{" "}
                    <span className='tw-py-1 tw-text-gray-200'>
                      {item.quantify}
                    </span>{" "}
                    <i
                      onClick={() => handleMinus(item)}
                      className={`${
                        item.quantify > 1
                          ? "hover:tw-text-gray-400 tw-cursor-pointer"
                          : "tw-opacity-50"
                      } tw-px-2 tw-py-1 tw-text-gray-200  tw-transition-all  fa-solid fa-minus`}
                    ></i>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(item)}
                  className='tw-mt-1 tw-text-gray-200 tw-border-b tw-border-red-400 tw-hover:text-gray-400 tw-transition-all'
                >
                  Remove
                </button>
              </div>
              <h3 className='tw-w-[30%] tw-text-gray-100'>
                <NumberFormat
                  className='tw-bg-transparent tw-text-gray-100 tw-outline-none tw-w-full'
                  thousandSeparator={true}
                  suffix=' VND'
                  value={item.prices}
                  displayType='text'
                />
              </h3>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Bag;

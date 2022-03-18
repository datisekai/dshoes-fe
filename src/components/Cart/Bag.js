import React, { useState } from "react";
import "../../assets/css/index.css";
import "boxicons";
import NumberFormat from "react-number-format";

const Bag = ({ carts, handleAdd, handleMinus, handleDelete }) => {
  return (
    <div className="w-full md:w-[50%] lg:w-[60%]">
      <h1 className="underlined-blue uppercase text-gray-100 text-2xl">Bag</h1>
      <div className="mt-2">
        {carts &&
          carts.map((item, index) => (
            <div
              key={index}
              className="mt-3 border-b border-solid border-[#ccc] flex justify-start py-5"
            >
              <img
                className="w-[150px] h-[150px] object-cover rounded-md w-[25%]"
                src={item.image}
              ></img>
              <div className="px-5 w-[45%]">
                <h2 className="text-gray-100 text-md">{item.name}</h2>
                <p className="text-red-300 text-sm">Women's Shoes</p>
                <p className="text-gray-200 text-md">
                  <span className="capitalize">{item.color}</span> Shoes
                </p>
                <p className="text-gray-200 text-md">Size {item.size}</p>
                <div className="flex">
                  <div className="">
                    <label htmlFor="" className="text-gray-200 text-md">
                      Quantify
                    </label>
                    <i
                      onClick={() => handleAdd(item)}
                      className=" px-2 py-1 text-gray-200 hover:text-gray-400 transition-all cursor-pointer fa-solid fa-plus"
                    ></i>{" "}
                    <span className="py-1 text-gray-200">{item.quantify}</span>{" "}
                    <i
                      onClick={() => handleMinus(item)}
                      className={`${
                        item.quantify > 1
                          ? "hover:text-gray-400 cursor-pointer"
                          : "opacity-50"
                      } px-2 py-1 text-gray-200  transition-all  fa-solid fa-minus`}
                    ></i>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(item)}
                  className="mt-1 text-gray-200 border-b border-red-400 hover:text-gray-400 transition-all"
                >
                  Remove
                </button>
              </div>
              <h3 className="w-[30%] text-gray-100">
                <NumberFormat
                  className="bg-transparent text-gray-100 outline-none w-full"
                  thousandSeparator={true}
                  suffix=" VND"
                  value={item.prices}
                />
              </h3>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Bag;

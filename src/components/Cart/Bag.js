import React from "react";
import "../../assets/css/index.css";
import 'boxicons';

const Bag = () => {
  return (
    <div className="w-full md:w-[50%] lg:w-[60%]">
      <h1 className="underlined-blue uppercase text-gray-100 text-2xl">Bag</h1>
      <div className="mt-2">
      <div className="mt-3 border-b border-solid border-[#ccc] flex justify-start py-5">
        <img className="w-[150px] h-[150px] object-cover rounded-md w-[30%]" src="https://source.unsplash.com/random"></img>
        <div className="px-5 w-[50%]">
          <h2 className="text-gray-100 text-md">Nike Air Max 2021</h2>
          <p className="text-red-300 text-sm">Women's Shoes</p>
          <p className="text-gray-200 text-md">Black Shoes</p>
          <div className="flex mt-2">
            <div>
              <label htmlFor="" className="text-[#ccc] text-md">Size</label>
              <select name="" id="" className="ml-1 bg-transparent text-[#999] text-md border-b border-[#007BFF]">
                <option value="">40</option>
                <option value="">39</option>
                <option value="">38</option>
                <option value="">37</option>
              </select>
            </div>
            <div className="ml-3">
              <label htmlFor="" className="text-[#ccc] text-md">Quantify</label>
              <select name="" id="" className="ml-1 bg-transparent text-[#999] text-md border-b border-[#007BFF]">
                <option value="">1</option>
                <option value="">2</option>
                <option value="">3</option>
                <option value="">4</option>
              </select>
            </div>
          </div>
          <button className="mt-3 text-gray-300 border-b border-red-400 hover:text-gray-100 transition-transform">Remove</button>
        </div>
        <h3 className="w-[20%] text-gray-100">4.699.000</h3>
      </div>
      <div className="mt-3 border-b border-solid border-[#ccc] flex justify-start py-5">
        <img className="w-[150px] h-[150px] object-cover rounded-md w-[30%]" src="https://source.unsplash.com/random"></img>
        <div className="px-5 w-[50%]">
          <h2 className="text-gray-100 text-md">Nike Air Max 2021</h2>
          <p className="text-red-300 text-sm">Women's Shoes</p>
          <p className="text-gray-200 text-md">Black Shoes</p>
          <div className="flex mt-2">
            <div>
              <label htmlFor="" className="text-[#ccc] text-md">Size</label>
              <select name="" id="" className="ml-1 bg-transparent text-[#999] text-md border-b border-[#007BFF]">
                <option value="">40</option>
                <option value="">39</option>
                <option value="">38</option>
                <option value="">37</option>
              </select>
            </div>
            <div className="ml-3">
              <label htmlFor="" className="text-[#ccc] text-md">Quantify</label>
              <select name="" id="" className="ml-1 bg-transparent text-[#999] text-md border-b border-[#007BFF]">
                <option value="">1</option>
                <option value="">2</option>
                <option value="">3</option>
                <option value="">4</option>
              </select>
            </div>
          </div>
          <button className="mt-3 text-gray-300 border-b border-red-400 hover:text-gray-100 transition-transform">Remove</button>
        </div>
        <h3 className="w-[20%] text-gray-100">4.699.000</h3>
      </div>
      <div className="mt-3 border-b border-solid border-[#ccc] flex justify-start py-5">
        <img className="w-[150px] h-[150px] object-cover rounded-md w-[30%]" src="https://source.unsplash.com/random"></img>
        <div className="px-5 w-[50%]">
          <h2 className="text-gray-100 text-md">Nike Air Max 2021</h2>
          <p className="text-red-300 text-sm">Women's Shoes</p>
          <p className="text-gray-200 text-md">Black Shoes</p>
          <div className="flex mt-2">
            <div>
              <label htmlFor="" className="text-[#ccc] text-md">Size</label>
              <select name="" id="" className="ml-1 bg-transparent text-[#999] text-md border-b border-[#007BFF]">
                <option value="">40</option>
                <option value="">39</option>
                <option value="">38</option>
                <option value="">37</option>
              </select>
            </div>
            <div className="ml-3">
              <label htmlFor="" className="text-[#ccc] text-md">Quantify</label>
              <select name="" id="" className="ml-1 bg-transparent text-[#999] text-md border-b border-[#007BFF]">
                <option value="">1</option>
                <option value="">2</option>
                <option value="">3</option>
                <option value="">4</option>
              </select>
            </div>
          </div>
          <button className="mt-3 text-gray-300 border-b border-red-400 hover:text-gray-100 transition-transform">Remove</button>
        </div>
        <h3 className="w-[20%] text-gray-100">4.699.000</h3>
      </div>
      </div>
    </div>
  );
};

export default Bag;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../../assets/css/index.css";
import Pagination from "../../components/Pagination/Pagination";
import SkeletonShoes from "../../components/Skeleton/SkeletonShoes";
import { setText } from "../../redux/searchReducer";
import Shoe from "./Shoe";

const ShoesList = ({ type, list, pagination, handle, loading, types }) => {
  const text = useSelector((state) => state.search.text);
  const flag = useSelector((state) => state.search.flag);
  const { handleApply, handleSetTo, handleSetFrom, handleSetKind } = handle;
  const dispatch = useDispatch();
  const [display, setDisplay] = useState(false);

  return (
    <div className="bg-[#222222] min-h-[100vh] relative py-5 overflow-hidden">
      <div className="max-w-[1200px] mx-auto my-0 flex flex-col md:flex-row justify-between">
        <div className="w-full md:w-[20%] bg-[#2a2a2a] mt-0 md:mt-6 rounded-md py-2 px-5">
          <div className="flex justify-between items-center">
            <h1 className="text-gray-100 text-xl underlined-blue">Category</h1>
            <i
              onClick={() => setDisplay(!display)}
              className="block md:hidden text-gray-100 text-lg cursor-pointer fa-solid fa-filter"
            ></i>
          </div>
          <ul className="mt-5">
            <Link
              to={`/products`}
              className={`${
                !type && "active"
              } capitalize block text-gray-100 py-[4px] mt-1 hover:text-gray-300 transition-all`}
            >
              All Products
            </Link>
            {flag && flag && (
              <Link
                to={`/products/results`}
                className={`${
                  type === "results" && "active"
                } capitalize block text-gray-100 py-[4px] mt-1 hover:text-gray-300 transition-all`}
              >
                Results
              </Link>
            )}
            {types?.map((item) => (
              <Link
                key={item._id}
                to={`/products/${item.type}?id=${item._id}`}
                className={`${
                  item.type === type ? "active" : ""
                } capitalize block text-gray-100 py-[4px] mt-1 hover:text-gray-300 transition-all`}
              >
                {item.type}
              </Link>
            ))}
          </ul>

          <div className={`${display ? "block" : "hidden"} md:block`}>
            <h3 className="mt-3 text-gray-100 text-lg">Text</h3>
            <form onSubmit={handleApply}>
              <input
                value={text}
                onChange={(e) => dispatch(setText(e.target.value))}
                type="text"
                placeholder="Enter your text..."
                className="px-2 py-1 text-gray-100 placeholder:text-sm outline-none border-b border-l border-blue-400 placeholder:text-gray-300 w-full mt-1 bg-[#222] rounded-md"
              />
            </form>

            <ul className="mt-3">
              <h3 className="text-gray-100 text-lg">Prices</h3>
              <label
                htmlFor={`input-1`}
                className="flex items-center justify-between mt-1 text-gray-100 px-5 py-1 bg-[#222] rounded-md hover:opacity-75 transition-all cursor-pointer"
              >
                <input
                  type="radio"
                  name="inputSize"
                  id={`input-1`}
                  value="duoi6tr"
                  onChange={() => {
                    handleSetTo(undefined);
                    handleSetFrom(6000000);
                  }}
                />
                <p className="capitalize">Under 6tr</p>
              </label>

              <label
                htmlFor={`input-2`}
                className="flex items-center justify-between mt-1 text-gray-100 px-5 py-1 bg-[#222] rounded-md hover:opacity-75 transition-all cursor-pointer"
              >
                <input
                  type="radio"
                  name="inputSize"
                  id={`input-2`}
                  onChange={() => {
                    handleSetTo(6000000);
                    handleSetFrom(10000000);
                  }}
                />
                <p className="capitalize"> 6tr - 10tr</p>
              </label>
              <label
                htmlFor={`input-3`}
                className="flex items-center justify-between mt-1 text-gray-100 px-5 py-1 bg-[#222] rounded-md hover:opacity-75 transition-all cursor-pointer"
              >
                <input
                  type="radio"
                  name="inputSize"
                  id={`input-3`}
                  onChange={() => {
                    handleSetTo(10000000);
                    handleSetFrom(undefined);
                  }}
                />
                <p className="capitalize">Over 10tr</p>
              </label>
              <label
                htmlFor={`input-4`}
                className="flex items-center justify-between mt-1 text-gray-100 px-5 py-1 bg-[#222] rounded-md hover:opacity-75 transition-all cursor-pointer"
              >
                <input
                  type="radio"
                  name="inputSize"
                  id={`input-4`}
                  onChange={() => {
                    handleSetTo(undefined);
                    handleSetFrom(undefined);
                  }}
                />
                <p className="capitalize">All</p>
              </label>
            </ul>
            <p className="text-gray-100 mt-3 capitalize">Choose price range</p>
            <div className="flex justify-between items-center flex-col mt-1">
              <input
                type="number"
                className="w-[100%] text-gray-300 rounded-md px-2 text-md placeholder:text-sm outline-none text-left bg-[#222] placeholder:text-gray-300 "
                placeholder="from"
                onChange={(e) => handleSetTo(e.target.value)}
              />{" "}
              <span className="text-gray-300">
                <i className="fa-solid fa-angles-down"></i>
              </span>
              <input
                type="number"
                className="w-[100%] text-gray-300 rounded-md px-2 text-md placeholder:text-sm outline-none text-left bg-[#222] placeholder:text-gray-300 "
                placeholder="to"
                onChange={(e) => handleSetFrom(e.target.value)}
              />
            </div>
            <div className="mt-3">
              <h3 className="text-gray-100 text-lg">Types</h3>

              {types &&
                types.map((item) => (
                  <label
                    key={item._id}
                    htmlFor={`input-${item._id}`}
                    className="flex items-center justify-between mt-1 text-gray-100 px-5 py-1 bg-[#222] rounded-md hover:opacity-75 transition-all cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="inputType"
                      id={`input-${item._id}`}
                      onChange={() => handleSetKind(item._id)}
                    />
                    <p className="capitalize">{item.type}</p>
                  </label>
                ))}
              <label
                htmlFor={`input-none`}
                className="flex items-center justify-between mt-1 text-gray-100 px-5 py-1 bg-[#222] rounded-md hover:opacity-75 transition-all cursor-pointer"
              >
                <input
                  type="radio"
                  name="inputType"
                  id={`input-none`}
                  onChange={() => handleSetKind(undefined)}
                />
                <p className="capitalize">All</p>
              </label>
            </div>
            <button
              onClick={handleApply}
              className="w-full mt-3 px-5 py-1 text-gray-100 bg-transparent border border-blue-400 rounded-md hover:bg-blue-700 transition-all"
            >
              Apply
            </button>
          </div>
        </div>
        <div className="w-full md:w-[80%] px-5">
          <h1 className="text-gray-100 text-2xl p-5 underlined-blue uppercase">
            {(type && type) || "ALL PRODUCT"}
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8 p-2 sm:p-4 md:p-5">
            {loading && <SkeletonShoes item={8} />}

            {list &&
              list.length > 0 &&
              list.map((item, index) => <Shoe key={index} product={item} />)}
          </div>
          {list && list.length < 1 && (
            <img
              className="w-full text-center object-cover"
              src="https://raw.githubusercontent.com/Ren0503/zenzen-js-share-video/master/client/src/assets/noresults.png"
            ></img>
          )}
          {list && list.length > 0 && (
            <Pagination pagination={pagination} handle={handle} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoesList;
